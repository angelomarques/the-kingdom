import { useAuth } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import { useData } from "../../contexts/DataContext";
import { db, fs } from "../../services/firebase";
import { getDate } from "../../utils/taskSection";

function AddLabelModal() {
  const { setIsModalActive } = useModalContext();
  const { user } = useAuth();
  const { lastTask } = useData();
  const [year, month, day] = getDate();

  // this function will cancel the session and delete the task from firestore
  async function cancelCurrentSession() {
    let todayCompletedTasksLength;

    await db
      .collection("users")
      .doc(user)
      .collection("tasksCompleted")
      .doc(year)
      .get()
      .then((doc) => {
        todayCompletedTasksLength =
          doc.data().months[month][day].tasksCompletedLength;
      })
      .catch((err) => alert(err.message));

    db.collection("users")
      .doc(user)
      .collection("tasksCompleted")
      .doc(year)
      .update({
        tasksCompletedLength: fs.FieldValue.increment(-1),
        [String(`months.${month}.tasksCompletedLength`)]:
          fs.FieldValue.increment(-1),
        [String(`months.${month}.${day}.tasksCompletedLength`)]:
          fs.FieldValue.increment(-1),
        [String(`months.${month}.${day}.tasksCompleted`)]:
          fs.FieldValue.arrayRemove(lastTask),
      })
      .then(() => setIsModalActive(false))
      .catch((err) => alert(err.message));
  }

  return (
    <>
      <h2 className="completedTask__title">
        Congratulations! You complete a session!
      </h2>
      <img
        className="completedTask__img"
        src="/images/soldier.png"
        alt="soldier"
      />
      <div className="completedTask__buttons">
        <div>
          <button onClick={cancelCurrentSession} type="button">
            Cancel
          </button>
          <button type="button">Confirm</button>
        </div>
        <button className="primaryBtn" type="button">
          Confirm and start break
        </button>
      </div>
    </>
  );
}

export default AddLabelModal;
