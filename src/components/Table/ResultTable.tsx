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
import AvatarModal from "./AvatarModal";
import { useStatesContext } from "../StatesContext";

function TableData({
  responseData,
}: {
  responseData: ResponseDataTypes;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(!isOpen);

  const responseDataArr = responseData.items.map(
    ({ name, html_url, repository }, index) => {
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
    }
  );

  return <>{responseDataArr}</>;
}

interface ResultTablePropsTypes {
  responseData: ResponseDataTypes;
  requestHandle: (page: number, rowsPerPage: number) => void;
}

export default function ResultTable({
  responseData,
  requestHandle,
}: ResultTablePropsTypes): JSX.Element {
  const { page, setPage, rowsPerPage, setRowsPerPage } = useStatesContext();

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
            <TableRow>
              <TableCell>Nazwa pliku i odsyłacz do pliku</TableCell>
              <TableCell align="center">Opis repozytorium</TableCell>
              <TableCell align="center">Użytkownik i avatar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.total_count ? (
              <TableData responseData={responseData} />
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
