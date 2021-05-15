import { useRouter } from "next/router";
import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";

import ModalButton from "../ModalButton";
import { useAuth } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import { db, fs } from "../../services/firebase";
import AddLabelModal from "./AddLabelModal";

function HomeModal({ modalName }) {
  const router = useRouter();
  const { modalClass, setModalClass, isModalActive, setIsModalActive } =
    useModalContext();
  const { setIsUserLoggedIn, setUser, signout, user } = useAuth();

  function logoutUser() {
    return signout()
      .then(() => {
        router.push("/");
        setIsUserLoggedIn(false);
        setUser("");
        setModalClass("fade-out modal");
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
      setModalClass("fade-in modal");
      return;
    }
    setModalClass("fade-out modal");
    document.body.style.overflowY = "visible";
  }, [isModalActive]);

  function addLabel(e) {
    e.preventDefault();
    const label = e.target["label"].value;
    const labelObject = {
      color: "#000000",
      label,
      lastSelected: false,
    };

    db.collection("users")
      .doc(user)
      .update({ labels: fs.FieldValue.arrayUnion(labelObject) })
      .catch((err) => alert(err.message));
    e.target.reset();
    setIsModalActive(false);
  }

  return (
    <section className={modalClass}>
      <div className="modal__content">
        <ModalButton btnType="close" handleClick={closeModal} />
        {modalName == "settings" && (
          <button onClick={logoutUser}>
            <BiLogOut className="buttonIcons" />
            <span>Log out</span>
          </button>
        )}
        {modalName == "addLabel" && (
          <form onSubmit={addLabel} className={"modal__addLabelForm"}>
            <input
              maxLength={30}
              autoComplete="off"
              name="label"
              type="text"
              placeholder="Add new label"
            />

            <button type="submit">
              <img src="/icons/add.svg" alt="add label" />
            </button>
          </form>
        )}
        {modalName == "completedTask" && <AddLabelModal/>}
      </div>
    </section>
  );
}

export default HomeModal;
