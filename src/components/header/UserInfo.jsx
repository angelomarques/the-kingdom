import { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";

import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../services/firebase";
import { getDate } from "../../utils/taskSection";

import styles from "../../styles/components/UserInfo.module.scss";

function UserInfo() {
  const { user } = useAuth();
  const [tasksCompletedLength, setTasksCompletedLength] = useState(0);
  const [year, month, day] = getDate();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user)
        .collection("tasksCompleted")
        .get()
        .then((col) => {
          if (col.empty) {
            return;
          }
          db.collection("users")
            .doc(user)
            .collection("tasksCompleted")
            .doc(year)
            .onSnapshot((doc) => {
              if (doc.data().months[month]) {
                if (!doc.data().months[month][day]) {
                  setTasksCompletedLength(0);
                  return;
                }
                setTasksCompletedLength(
                  doc.data().months[month][day].tasksCompletedLength
                );
              }
            });
        });
    }
  }, [user]);

  return (
    <div className={styles.userinfo}>
      <div className={`${styles.userinfo__info} ${styles.userinfo__lvl}`}>
        <span>Lvl 12</span>
      </div>
      <div className={styles.userinfo__info}>
        <span>{tasksCompletedLength}</span>
        <BiTask className={`${styles.userinfo__icon} buttonIcons`} />
      </div>
    </div>
  );
}

export default UserInfo;
