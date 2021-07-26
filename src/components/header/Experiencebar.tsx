import styles from "../../styles/components/Experiencebar.module.scss";

function Experiencebar() {
  return (
    <div className={styles.experiencebar}>
      <span>0xp</span>
      <div className={styles.experiencebar__progressbar}>
        <div className={styles.experiencebar__progress} style={{right: "90%"}} />
      </div>
      <span>256xp</span>
    </div>
  );
}

export default Experiencebar;
