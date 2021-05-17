import { db, fs } from "../services/firebase";

export function completeSection(timeSet, sectionTime, taskLabel) {
  const sectionObject = { timeSet, taskTime: sectionTime, taskLabel };

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

  [sectionObject.timeStandard, sectionObject.taskTimeRange] =
    timeRange(sectionTime);
  sectionObject.date = currentDate();

  return sectionObject;
}

export function getDate() {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  return [year, month, day];
}

export function saveTaskToDatabase(user, task) {
  // get date to access the collections and documents of firebase
  const [year, month, day] = getDate();

  db.collection("users")
    .doc(user)
    .collection("tasksCompleted")
    .doc(year)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        db.collection("users")
          .doc(user)
          .collection("tasksCompleted")
          .doc(year)
          .set({
            months: {
              [month]: {
                [day]: {
                  tasksCompleted: [task],
                  tasksCompletedLength: 1,
                },
                tasksCompletedLength: 1,
              },
            },
            tasksCompletedLength: 1,
          })
          .catch((err) => alert(err.message));
        return;
      }
      db.collection("users")
        .doc(user)
        .collection("tasksCompleted")
        .doc(year)
        .update({
          [String(`months.${month}.tasksCompletedLength`)]:fs.FieldValue.increment(1),
          [String(`months.${month}.${day}.tasksCompletedLength`)]:fs.FieldValue.increment(1),
          [String(`months.${month}.${day}.tasksCompleted`)]:fs.FieldValue.arrayUnion(task),
          tasksCompletedLength: fs.FieldValue.increment(1),
        })
        .catch((err) => alert(err.message));
    })
    .catch((err) => alert(err.message));
}

export function convertTimeToSeconds(timeString) {
  const timeArray = timeString.split(":");
  const hoursInSeconds = Number(timeArray[0]) * 3600;
  const minutesInSeconds = Number(timeArray[1]) * 60;
  const timeSeconds = Number(timeArray[2]);

  return hoursInSeconds + minutesInSeconds + timeSeconds;
}

export function convertSecondsToTime(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor(seconds / 60 - hours * 60)).padStart(
    2,
    "0"
  );
  const secondsTime = String(seconds % 60).padStart(2, "0");

  return hours + ":" + minutes + ":" + secondsTime;
}