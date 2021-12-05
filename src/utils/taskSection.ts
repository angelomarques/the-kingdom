import { useData } from "../contexts/DataContext";
import { db, fs } from "../services/firebase";
import { handleTasksCompleted } from "../services/handleFirebaseData";
import { Task, TasksData } from "../types/Task";
import { getWeekCompletedSessions } from "./handleSessionData";

export function completeSection(
  timeSet: string,
  sectionTime: number,
  taskLabel: string
) {
  const sectionObject: Task = { timeSet, taskTime: sectionTime, taskLabel };

  function convertTimeToSeconds(timeString: string) {
    const timeArray = timeString.split(":");
    const hoursInSeconds = Number(timeArray[0]) * 3600;
    const minutesInSeconds = Number(timeArray[1]) * 60;
    const timeSeconds = Number(timeArray[2]);

    return hoursInSeconds + minutesInSeconds + timeSeconds;
  }

  function convertSecondsToTime(seconds: number) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(
      Math.floor(seconds / 60 - Number(hours) * 60)
    ).padStart(2, "0");
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

export async function handleTasksInfo(year: string, month:string, day: string, userUid: string) {
  // const { setWeekSections, setTasksCompletedLength, setDaysInARow, daysInARow } = useData();
  let weekSections = 0;
  let tasksCompletedLength = 0;
  let daysInARow = 0;
  let minutesFocused = 0;

  const response = await handleTasksCompleted(year, userUid)
    .get()
    .then((doc) => {
      const data = doc.data() as TasksData;
      if (data) {
        weekSections = getWeekCompletedSessions(data, userUid);
        if (data?.months[month]) {
          const currentDay = data.months[month][day];
          if (!currentDay) return;

          minutesFocused = currentDay.totalTime / 60;

          tasksCompletedLength = currentDay.tasksCompletedLength;

          const todaysDate = new Date().toDateString();
          if (
            currentDay.tasksCompletedLength === 1 &&
            data.lastSessionDate !== todaysDate
          ) {
            handleTasksCompleted(year, userUid).update({
              lastSessionDate: todaysDate,
              daysInARow: data.daysInARow + 1,
            });
          }
          daysInARow = data.daysInARow;
        }
      }
    });
    return { weekSections, tasksCompletedLength, minutesFocused, daysInARow }
}

export async function saveTaskToDatabase(user: string, task: Task) {
  // get date to access the collections and documents of firebase
  const [year, month, day] = getDate();

  await handleTasksCompleted(year, user)
    .get()
    .then(async (doc) => {
      if (!doc.exists) {
        await handleTasksCompleted(year, user)
          .set({
            months: {
              [month]: {
                [day]: {
                  tasksCompleted: [task],
                  tasksCompletedLength: 1,
                  totalTime: task.taskTime,
                },
                tasksCompletedLength: 1,
                totalTime: task.taskTime,
              },
            },
            tasksCompletedLength: 1,
            totalTime: task.taskTime,
            lastSessionDate: new Date().toDateString(),
            daysInARow: 1,
          })
          .catch((err) => alert(err.message));
        return;
      }
      await handleTasksCompleted(year, user)
        .update({
          [String(`months.${month}.tasksCompletedLength`)]:
            fs.FieldValue.increment(1),
          [String(`months.${month}.totalTime`)]: fs.FieldValue.increment(
            task.taskTime
          ),
          [String(`months.${month}.${day}.tasksCompletedLength`)]:
            fs.FieldValue.increment(1),
          [String(`months.${month}.${day}.tasksCompleted`)]:
            fs.FieldValue.arrayUnion(task),
          [String(`months.${month}.${day}.totalTime`)]: fs.FieldValue.increment(
            task.taskTime
          ),
          tasksCompletedLength: fs.FieldValue.increment(1),
          totalTime: fs.FieldValue.increment(task.taskTime),
        })
        .catch((err) => alert(err.message));
    })
    .catch((err) => alert(err.message));
}

export function convertTimeToSeconds(timeString: string) {
  const timeArray = timeString.split(":");
  const hoursInSeconds = Number(timeArray[0]) * 3600;
  const minutesInSeconds = Number(timeArray[1]) * 60;
  const timeSeconds = Number(timeArray[2]);

  return hoursInSeconds + minutesInSeconds + timeSeconds;
}

export function convertSecondsToTime(seconds: number) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(
    Math.floor(seconds / 60 - Number(hours) * 60)
  ).padStart(2, "0");
  const secondsTime = String(seconds % 60).padStart(2, "0");

  return hours + ":" + minutes + ":" + secondsTime;
}
