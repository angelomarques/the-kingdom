import { IoArrowBackOutline, IoCloseOutline } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import { useContext } from "react";

import { ModalContext, useModalContext } from "../contexts/ModalContext";

import styles from "../styles/components/ModalButton.module.scss";

function ModalButton({handleClick, btnType }) {
  return (
    <div className={styles.modalButton}>
      <IconButton aria-label="close" onClick={handleClick} >
        {btnType == "close" ? (
          <IoCloseOutline className="buttonIcons" />
        ) : (
          <IoArrowBackOutline className="buttonIcons" />
        )}
      </IconButton>
    </div>
  );
}

export default ModalButton;
