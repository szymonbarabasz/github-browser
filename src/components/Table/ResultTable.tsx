import React, { useState } from "react";
import { ResponseDataTypes } from "../../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import LinkIcon from "@mui/icons-material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TableSortLabel from "@mui/material/TableSortLabel";
import AvatarModal from "./AvatarModal";
import { useStatesContext } from "../StatesContext";

type Order = "asc" | "desc";

interface Data {
  name: string;
  html_url: string;
  repository: {
    description: string | null;
    owner: { login: string; avatar_url: string };
  };
}

interface TableDataProps {
  responseData: ResponseDataTypes;
  order: Order;
  orderBy: string;
}

function TableData({
  responseData,
  order,
  orderBy,
}: TableDataProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(!isOpen);

  function sortFunction(a: Data, b: Data) {
    let comparedDataA: string | null | undefined = "";
    let comparedDataB: string | null | undefined = "";

    if (orderBy === "name") {
      comparedDataA = a.name.toLowerCase();
      comparedDataB = b.name.toLowerCase();
    } else if (orderBy === "description") {
      comparedDataA = a.repository.description?.toLowerCase();
      comparedDataB = b.repository.description?.toLowerCase();
    } else if (orderBy === "user") {
      comparedDataA = a.repository.owner.login.toLowerCase();
      comparedDataB = b.repository.owner.login.toLowerCase();
    }

    if (comparedDataA && comparedDataB) {
      if (comparedDataB < comparedDataA) {
        return order === "desc" ? -1 : 1;
      }
      if (comparedDataB > comparedDataA) {
        return order === "desc" ? 1 : -1;
      }
    }
    return 0;
  }

  const responseDataArr = responseData.items
    .sort(sortFunction)
    .map(({ name, html_url, repository }, index) => {
      return (
        <TableRow key={name + index}>
          <TableCell>
            {name}{" "}
            <IconButton href={html_url}>
              <LinkIcon />
            </IconButton>
          </TableCell>
          <TableCell align="center">{repository.description}</TableCell>
          <TableCell align="center">
            {repository.owner.login}{" "}
            <IconButton onClick={handleOpenModal}>
              <AccountCircleIcon />
            </IconButton>
            <AvatarModal
              imgSrc={repository.owner.avatar_url}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </TableCell>
        </TableRow>
      );
    });

  return <>{responseDataArr}</>;
}

interface ResultTablePropsTypes {
  responseData: ResponseDataTypes;
  requestHandle: (page: number, rowsPerPage: number) => void;
}

interface headCellTypes {
  id: string;
  label: string;
}

export default function ResultTable({
  responseData,
  requestHandle,
}: ResultTablePropsTypes): JSX.Element {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("name");
  const { page, setPage, rowsPerPage, setRowsPerPage } = useStatesContext();
  const headCell: readonly headCellTypes[] = [
    { id: "name", label: "Nazwa pliku i odsyłacz do pliku" },
    { id: "description", label: "Opis repozytorium" },
    { id: "user", label: "Użytkownik i avatar" },
  ];

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    requestHandle(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    requestHandle(page, +event.target.value);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const headCellsMapped = headCell.map((el) => {
    return (
      <TableCell
        align={el.id !== "name" ? "center" : "inherit"}
        key={el.id}
        sortDirection={orderBy === el.id ? order : false}
      >
        <TableSortLabel
          active={orderBy === el.id}
          direction={orderBy === el.id ? order : "asc"}
          onClick={(e) => handleRequestSort(e, el.id)}
        >
          {el.label}
        </TableSortLabel>
      </TableCell>
    );
  });

  return (
    <Paper
      sx={{
        width: "90%",
        margin: "auto",
        marginTop: "15px",
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>{headCellsMapped}</TableRow>
          </TableHead>
          <TableBody>
            {responseData.total_count ? (
              <TableData
                responseData={responseData}
                order={order}
                orderBy={orderBy}
              />
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={responseData.total_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
