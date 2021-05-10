import { db, fs } from "../services/firebase";

export function completeSection(sectionTime, taskLabel) {
  const sectionObject = { taskTime: sectionTime, taskLabel: taskLabel };

  function convertTimeToSeconds(timeString) {
    const timeArray = timeString.split(":");
    const hoursInSeconds = Number(timeArray[0]) * 3600;
    const minutesInSeconds = Number(timeArray[1]) * 60;
    const timeSeconds = Number(timeArray[2]);

    return hoursInSeconds + minutesInSeconds + timeSeconds;
  }

  function convertSecondsToTime(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor(seconds / 60 - hours * 60)).padStart(
      2,
      "0"
    );
    const secondsTime = String(seconds % 60).padStart(2, "0");

    return hours + ":" + minutes + ":" + secondsTime;
  }

  function currentDate() {
    return new Date().toDateString();
  }

  function timeRange(time) {
    const [currentTime, timeStandard] = new Date().toTimeString().split(" ");
    const currentTimeToSeconds = convertTimeToSeconds(currentTime);
    const initialTime = convertSecondsToTime(currentTimeToSeconds - time);
    const range = initialTime + " - " + currentTime;
    return [timeStandard, range];
  }

  [sectionObject.timeStandard, sectionObject.taskTimeRange] = timeRange(
    sectionTime
  );
  sectionObject.date = currentDate();

  return sectionObject;
}

export function saveTaskToDatabase(user, task) {
  db.collection("users")
    .doc(user)
    .collection("tasksCompleted")
    .doc("2021")
    .get()
    .then((doc) => {
      if (!doc.exists) {
        db.collection("users")
          .doc(user)
          .collection("tasksCompleted")
          .doc("2021")
          .set({
            tasksCompleted: [task],
            tasksCompletedLength: 1
          })
          .catch((err) => alert(err.message));
        return;
      }
      db.collection("users")
        .doc(user)
        .collection("tasksCompleted")
        .doc("2021")
        .update({
          tasksCompleted: fs.FieldValue.arrayUnion(task),
          tasksCompletedLength: fs.FieldValue.increment(1)
        })
        .catch((err) => alert(err.message));
    })
    .catch((err) => alert(err.message));
}