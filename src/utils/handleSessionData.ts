import moment from "moment";
import { TasksData } from "../types/Task";
import { handleTasksCompleted } from "../services/handleFirebaseData";

export const getWeekCompletedSessions = (tasksData: TasksData, userUid: string) => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const currentDateDay = date.getDate();
  const currentWeekDay = date.getDay();
  let result = 0;

  let yearBeforeData: TasksData;

  const daysToSearch = Array.from(
    { length: currentWeekDay + 1 },
    (_, i) => currentDateDay - i
  ).map((number) => {
    if (number <= 0) {
      const month = currentMonth > 1 ? currentMonth - 1 : 12;
      const year = currentMonth > 1 ? currentYear : currentYear - 1;
      const daysInTheMonthBefore = moment(
        `${year}-${month}`,
        "YYYY-MM"
      ).daysInMonth();
      return { day: daysInTheMonthBefore + number, month: month, year: year };
    }
    return { day: number, month: currentMonth, year: currentYear };
  });

  const actualDays = {
    [currentMonth]: Object.keys(tasksData?.months[currentMonth] || {}),
  };

  if (daysToSearch.some(item => item.year !== currentYear)) {
    handleTasksCompleted(String(currentYear - 1), userUid).get().then(doc => {
      if (!doc.exists) return;
      yearBeforeData = doc.data() as TasksData;
    })

    actualDays[12] = Object.keys(yearBeforeData?.months[12] || {})
  } else {
    actualDays[currentMonth - 1] = Object.keys(tasksData?.months[currentMonth - 1] || {})
  }
  
  for (let i = 0; i < daysToSearch.length; i++) {
    const item = daysToSearch[i];
    const tasks = item.year === currentYear ? tasksData : yearBeforeData;
    if (actualDays[item.month].includes(String(item.day))) {
      result += tasks.months[item.month][item.day].tasksCompletedLength;
    }
  }

  // console.log(daysToSearch);
  //   console.log(tasksData);
  // console.log(Object.keys(tasksData.months[12] || {}));
  //   console.log(daysToSearch);
  //   console.log(result);
  // console.log(Array.from({ length: 6 + 1 }, (_, i) => 3 - i));
  return result;
};
