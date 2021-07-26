import { useAuth } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import { useData } from "../../contexts/DataContext";
import { db, fs } from "../../services/firebase";
import { getDate } from "../../utils/taskSection";
import { useState } from "react";

function TaskCompletedModal() {
  const { setIsModalActive } = useModalContext();
  const { user } = useAuth();
  const { lastTask, setIsBreakActive } = useData();
  const [year, month, day] = getDate();

  const [isAudioOn, setIsAudioOn] = useState(true);

  // this function will cancel the session and delete the task from firestore
  function cancelCurrentSession() {
    setIsAudioOn(false);
    return db
      .collection("users")
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

  function confirm() {
    setIsAudioOn(false);
    setIsModalActive(false);
  }

  function startBreakTimer() {
    confirm();
    setIsBreakActive(true);
  }

  function changeAudioVolume(e) {
    const audio = e.target;
    audio.volume = 0.1;
  }

  return (
    <>
      {isAudioOn && (
        <audio
          onLoadedMetadata={changeAudioVolume}
          src="/alarm-buzzer.wav"
          autoPlay
          loop={true}
        ></audio>
      )}
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
          <button onClick={confirm} type="button">
            Confirm
          </button>
        </div>
        <button onClick={startBreakTimer} className="primaryBtn" type="button">
          Confirm and start break
        </button>
      </div>
    </>
  );
}

export default TaskCompletedModal;
