import { useAuth } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import { useData } from "../../contexts/DataContext";
import { db, fs } from "../../services/firebase";
import { getDate, handleTasksInfo, saveTaskToDatabase } from "../../utils/taskSection";
import { useState } from "react";

function TaskCompletedModal() {
  const { setIsModalActive } = useModalContext();
  const { user } = useAuth();
  const { 
    finishedTask, 
    daysInARow,
    setMinutesFocused,
    setIsBreakActive, 
    setWeekSections, 
    setTasksCompletedLength, 
    setDaysInARow 
  } = useData();
  const [year, month, day] = getDate();

  const [isAudioOn, setIsAudioOn] = useState(true);

  // this function will cancel the session and delete the task from firestore
  function cancelCurrentSession() {
    setIsAudioOn(false);
    setIsModalActive(false)
    // return db
    //   .collection("users")
    //   .doc(user)
    //   .collection("tasksCompleted")
    //   .doc(year)
    //   .update({
    //     tasksCompletedLength: fs.FieldValue.increment(-1),
    //     [String(`months.${month}.tasksCompletedLength`)]:
    //       fs.FieldValue.increment(-1),
    //     [String(`months.${month}.${day}.tasksCompletedLength`)]:
    //       fs.FieldValue.increment(-1),
    //     [String(`months.${month}.${day}.tasksCompleted`)]:
    //       fs.FieldValue.arrayRemove(lastTask),
    //   })
    //   .then(() => setIsModalActive(false))
    //   .catch((err) => alert(err.message));
  }

  async function confirm() {
    setIsAudioOn(false);
    setIsModalActive(false);
    if (user) await saveTaskToDatabase(user.uid, finishedTask);
    handleTasksInfo(year, month, day, user.uid).then(data => {
      console.log('modal task info called')
      setWeekSections(data.weekSections);
      setTasksCompletedLength(data.tasksCompletedLength);
      setMinutesFocused(data.minutesFocused)
      if (daysInARow !== data.daysInARow) setDaysInARow(data.daysInARow);
    })
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
