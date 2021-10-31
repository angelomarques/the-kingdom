import { useRouter } from "next/router";
import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";

import ModalButton from "../ModalButton";
import { useAuth } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import TaskCompletedModal from "./TaskCompletedModal";
import AddLabelModal from "./AddLabelModal";
import { ModalType } from "../../types/Modal";

type HomeModalProps = {
  modalName: ModalType;
}

function HomeModal({ modalName }: HomeModalProps) {
  const router = useRouter();
  const { isModalActive, setIsModalActive } =
    useModalContext();
  const { setIsUserLoggedIn, setUser, signout } = useAuth();

  function logoutUser() {
    return signout()
      .then(() => {
        router.push("/");
        setIsUserLoggedIn(false);
        setUser(null);
        setIsModalActive(false);
      })
      .catch((err) => alert(err));
  }

  function closeModal() {
    return setIsModalActive(false);
  }

  useEffect(() => {
    // handle modal
    if (isModalActive) {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "visible";
  }, [isModalActive]);

  return (
    <section className={isModalActive ? "fade-in modal" : "fade-out modal"}>
      <div className="modal__content">
        <ModalButton btnType="close" handleClick={closeModal} />
        {modalName === "settings" && (
          <button onClick={logoutUser}>
            <BiLogOut className="buttonIcons" />
            <span>Log out</span>
          </button>
        )}
        {modalName === "addLabel" && <AddLabelModal />}

        {modalName === "completedTask" && <TaskCompletedModal />}
      </div>
    </section>
  );
}

export default HomeModal;
