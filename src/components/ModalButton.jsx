import styles from "../styles/components/ModalButton.module.scss";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

function ModalButton({ btnType }) {
  const { setFormOpened } = useContext(ModalContext);

  function back() {
    setFormOpened("login");
  }

  return (
    <div onClick={back} className={styles.modalButton}>
      <IconButton aria-label="close">
        {btnType == "close" ? (
          <CloseIcon classes={{ root: "buttonIcons" }} />
        ) : (
          <ArrowBack classes={{ root: "buttonIcons" }} />
        )}
      </IconButton>
    </div>
  );
}

export default ModalButton;
