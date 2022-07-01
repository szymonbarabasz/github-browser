import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

export default function ModalFunction(props: {
  imgSrc: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const handleCloseModal = () => props.setOpenModal(false);

  return (
    <Modal
      className="modal"
      open={props.openModal}
      onClose={handleCloseModal}
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        timeout: 500,
      }}
      closeAfterTransition
    >
      <Fade in={props.openModal}>
        <Box>
          <img src={props.imgSrc} alt="avatar" />
        </Box>
      </Fade>
    </Modal>
  );
}
