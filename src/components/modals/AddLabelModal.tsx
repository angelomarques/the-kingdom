import { FormEventHandler } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import { db, fs } from "../../services/firebase";

function AddLabelModal() {
  const { user } = useAuth();
  const { setIsModalActive } = useModalContext();

  const addLabel: FormEventHandler<HTMLFormElement> = (e) => {
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
  );
}

export default AddLabelModal;
