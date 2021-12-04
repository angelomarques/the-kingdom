import { useEffect, useState, FC } from "react";
import { BiTask } from "react-icons/bi";
import { Tooltip } from '@material-ui/core'

import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../services/firebase";
import { getDate } from "../../utils/taskSection";

import styles from "../../styles/components/UserInfo.module.scss";
import { getWeekCompletedSessions } from "../../utils/handleSessionData";
import { TasksData } from "../../types/Task";
import { handleTasksCompleted } from "../../services/handleFirebaseData";

function UserInfo() {
  const { user } = useAuth();
  const [tasksCompletedLength, setTasksCompletedLength] = useState(0);
  const [year, month, day] = getDate();
  const [weekSections, setWeekSections] = useState(0);
  const [daysInARow, setDaysInARow] = useState(0);

  useEffect(() => {
    if (user) {
      handleTasksCompleted(year, user.uid)
        .onSnapshot((doc) => {
          const data = doc.data() as TasksData;
          if (data) {
            setWeekSections(getWeekCompletedSessions(data, user.uid));
            if (data?.months[month]) {
              const currentDay = data.months[month][day];
              if (!currentDay) {
                setTasksCompletedLength(0);
                return;
              }

              setTasksCompletedLength(
                currentDay.tasksCompletedLength
              );
              
              const todaysDate = new Date().toDateString()
              if (currentDay.tasksCompletedLength === 1 && data.lastSessionDate !== todaysDate) {
                handleTasksCompleted(year, user.uid).update({
                  lastSessionDate: todaysDate,
                  daysInARow: data.daysInARow + 1
                })
              }
              if (daysInARow !== data.daysInARow) setDaysInARow(data.daysInARow)
            }
          }
        });
    }
  }, [user]);

  const Message: FC = () => {
    return (
      <div className={styles.userinfo__tooltip}>
        <div>
          <p>Sessions completed of the week:</p>
          <p>{weekSections}{" "}session{weekSections === 1 ? "" : "s"}</p>
        </div>
        <div>
          <p>Days in a row:</p>
          <p>{daysInARow}{" "}day{daysInARow === 1 ? "" : "s"}</p>
        </div>
      </div>
    )
  }

  return (
    <Tooltip title={<Message />}>
      <div className={styles.userinfo}>
        <div className={`${styles.userinfo__info} ${styles.userinfo__lvl}`}>
          <span>Lvl 12</span>
        </div>
        <div className={styles.userinfo__info}>
          <span>{tasksCompletedLength}</span>
          <BiTask className={`${styles.userinfo__icon} buttonIcons`} />
        </div>
      </div>
    </Tooltip>
  );
}

export default UserInfo;
