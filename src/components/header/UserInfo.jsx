import { BiTask } from "react-icons/bi";

import styles from "../../styles/components/UserInfo.module.scss";

function UserInfo() {
  return (
    <div className={styles.userinfo} >
      <div className={styles.userinfo__info}>
        <span>Lvl 12</span>
      </div>
      <div className={styles.userinfo__info}>
        <span>126</span>
        <BiTask className={`${styles.userinfo__icon} buttonIcons`} />
      </div>
    </div>
  );
}

export default UserInfo;
