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
import { useData } from "../../contexts/DataContext";

function UserInfo() {
  const { weekSections, daysInARow, tasksCompletedLength } = useData()

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
