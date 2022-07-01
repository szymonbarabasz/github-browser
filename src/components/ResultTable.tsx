import React, { useState } from "react";
import { responseDataTypes } from "../PresentationComponent";
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
import ModalFunction from "./AvatarModal";

function TableData(props: {
  responseData: responseDataTypes;
  page: number;
  rowsPerPage: number;
}): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  const responseDataArr = props.responseData.items
    .slice(
      props.page * props.rowsPerPage,
      props.page * props.rowsPerPage + props.rowsPerPage
    )
    .map((el) => {
      return (
        <TableRow key={el.name}>
          <TableCell>
            {el.name}{" "}
            <IconButton href={el.html_url}>
              <LinkIcon />
            </IconButton>
          </TableCell>
          <TableCell align="center">{el.repository.description}</TableCell>
          <TableCell align="center">
            {el.repository.owner.login}{" "}
            <IconButton onClick={handleOpenModal}>
              <AccountCircleIcon />
            </IconButton>
            <ModalFunction
              imgSrc={el.repository.owner.avatar_url}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </TableCell>
        </TableRow>
      );
    });

  return <>{responseDataArr}</>;
}

export default function ResultTable(props: {
  responseData: responseDataTypes;
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
            {props.responseData.total_count ? (
              <TableData
                responseData={props.responseData}
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
        count={props.responseData.total_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
