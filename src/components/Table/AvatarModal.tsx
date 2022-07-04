import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

interface AvatarModalPropsTypes {
  imgSrc: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarModal({
  imgSrc,
  isOpen,
  setIsOpen,
}: AvatarModalPropsTypes): JSX.Element {
  const handleCloseModal = () => setIsOpen(!isOpen);

  return (
    <Modal
      className="modal"
      open={isOpen}
      onClose={handleCloseModal}
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        timeout: 500,
      }}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <Box>
          <img src={imgSrc} alt="avatar" />
        </Box>
      </Fade>
    </Modal>
  );
}
