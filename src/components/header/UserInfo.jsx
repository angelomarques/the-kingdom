import { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";

import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../services/firebase";

import styles from "../../styles/components/UserInfo.module.scss";

function UserInfo() {
  const { user } = useAuth();
  const [tasksCompletedLength, setTasksCompletedLength] = useState(0);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user)
        .collection("tasksCompleted")
        .doc("2021")
        .onSnapshot((doc) => {
          setTasksCompletedLength(doc.data().tasksCompletedLength);
        });
    }
  }, [user]);

  return (
    <div className={styles.userinfo}>
      <div className={styles.userinfo__info}>
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
