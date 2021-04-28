import { IoArrowBackOutline, IoCloseCircleOutline } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import { useContext } from "react";


import { ModalContext } from "../contexts/ModalContext";

import styles from "../styles/components/ModalButton.module.scss";

function ModalButton({ btnType }) {
  const { setFormOpened } = useContext(ModalContext);

  function back() {
    setFormOpened("login");
  }

  return (
    <div onClick={back} className={styles.modalButton}>
      <IconButton aria-label="close">
        {btnType == "close" ? (
          <IoCloseCircleOutline className="buttonIcons" />
        ) : (
          <IoArrowBackOutline className="buttonIcons" />
        )}
      </IconButton>
    </div>
  );
}

export default ModalButton;
