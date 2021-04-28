import { useEffect, useState } from "react";
import styles from "../styles/components/Countdown.module.scss";

function Countdown() {
  const [currentTime, setCurrentTime] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  let runningTimer;

  useEffect(() => {
    if (isTimerRunning && currentTime > 0) {
      runningTimer = setTimeout(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    } else if (isTimerRunning && currentTime == 0) {
      setIsTimerRunning(false);
      setCurrentTime(25 * 60);
    }
  }, [currentTime]);

  const [minuteTens, minuteUnities] = String(Math.floor(currentTime / 60))
    .padStart(2, 0)
    .split("");

  const [secondTens, secondUnities] = String(currentTime % 60)
    .padStart(2, 0)
    .split("");

  function toggleTimer() {
    if (isTimerRunning) {
      clearTimeout(runningTimer)
      setCurrentTime(25 * 60);
      setIsTimerRunning(false);
      return;
    }
    setIsTimerRunning(true);
    setCurrentTime(currentTime - 1);
  }

  return (
    <div className={styles.countdown}>
      <div className={styles.countdown__timer}>
        <div className={styles.minutes}>
          <div className={styles.numberBox}>
            <span>{minuteTens}</span>
          </div>
          <div className={styles.numberBox}>
            <span>{minuteUnities}</span>
          </div>
        </div>
        <div className={styles.timerColons}>
          <span></span>
          <span></span>
        </div>
        <div className={styles.seconds}>
          <div className={styles.numberBox}>
            <span>{secondTens}</span>
          </div>
          <div className={styles.numberBox}>
            <span>{secondUnities}</span>
          </div>
        </div>
      </div>
      <button
        onClick={toggleTimer}
        type="button"
        className={isTimerRunning && styles.countdown__buttonActive}
      >
        {isTimerRunning ? "Cancel" : "Train Soldier"}
      </button>
    </div>
  );
}

export default Countdown;
