import React, { useState } from "react";
import { ResponseDataTypes } from "../../PresentationComponent";
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

interface TableDataPropsTypes {
  responseData: ResponseDataTypes;
  page: number;
  rowsPerPage: number;
}

function TableData({
  responseData,
  page,
  rowsPerPage,
}: TableDataPropsTypes): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(!isOpen);

  const responseDataArr = responseData.items
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

export default function ResultTable({
  responseData,
}: {
  responseData: ResponseDataTypes;
}): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
              <TableData
                responseData={responseData}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            ) : (
              <TableRow></TableRow>
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
