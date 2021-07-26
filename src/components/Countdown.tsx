import { Menu, MenuItem } from "@material-ui/core";
import { MouseEventHandler, useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { useModalContext } from "../contexts/ModalContext";
import { completeSection, saveTaskToDatabase } from "../utils/taskSection";

import styles from "../styles/components/Countdown.module.scss";
import { getTimerUnities } from "../utils/countdownTools";

function Countdown() {
  // states for the countdown functioning
  const [currentTime, setCurrentTime] = useState(6);

  //contexts
  const { setIsModalActive, setModal } = useModalContext();
  const { user } = useAuth();
  const { labels, setFinishedTask, isTimerRunning, setIsTimerRunning } = useData();

  const [currentLabel, setCurrentLabel] = useState("");
  const [labelanchorEl, setLabelAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeSet, setTimeSet] = useState("25 min");

  const timeOptions = ["25 min", "50 min", "1 hr"];

  function selectLabel(opt: string) {
    setCurrentLabel(opt);
    setLabelAnchorEl(null);
  }

  const openMenu = (e: any, menu: string) => {
    if (menu === "set time") {
      return setAnchorEl(e.currentTarget);
    } else if (menu === "set label") {
      return setLabelAnchorEl(e.currentTarget);
    }
  }

  function handleMenuClose(menu: string) {
    if (menu == "set time") {
      return setAnchorEl(null);
    } else if (menu == "set label") {
      return setLabelAnchorEl(null);
    }
  }

  function selectTimeSet(opt: string) {
    setTimeSet(opt);
    setAnchorEl(null);
  }

  function convertTimeSetToNumber(timeToConvert: string) {
    let time = Number(timeToConvert.split(" ")[0]);
    if (time == 1) {
      time = 60;
    }
    return time;
  }

  useEffect(() => {
    if (labels) {
      labels.map((label) => label.lastSelected && setCurrentLabel(label.label));
    }
  }, [labels]);

  // useEffect(() => {
  //   const time = convertTimeSetToNumber(timeSet);
  //   setCurrentTime(time * 60);
  // }, [timeSet]);

  let runningTimer: NodeJS.Timeout;

  useEffect(() => {
    if (isTimerRunning && currentTime > 0) {
      runningTimer = setTimeout(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    } else if (isTimerRunning && currentTime == 0) {
      const time = convertTimeSetToNumber(timeSet);

      // reseting the states
      setIsTimerRunning(false);
      setCurrentTime(time * 60);

      // Adding the task to firebase
      const task = completeSection(timeSet, time * 60, currentLabel);
      setFinishedTask(task);

      setModal("completedTask");
      setIsModalActive(true);
    }
  }, [currentTime]);

  const [minuteTens, minuteUnities, secondTens, secondUnities] =
    getTimerUnities(currentTime, true);

  function toggleTimer() {
    if (isTimerRunning) {
      clearTimeout(runningTimer);
      setCurrentTime(25 * 60);
      setIsTimerRunning(false);
      return;
    }
    setIsTimerRunning(true);
    setCurrentTime(currentTime - 1);
  }

  function openAddLabelModal() {
    setModal("addLabel");
    setIsModalActive(true);
    setLabelAnchorEl(null);
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
      <div
        style={{ position: "relative" }}
        className={styles.countdown__modeButtons}
      >
        <button
          type="button"
          onClick={(event) => openMenu(event, "set label")}
          className={styles.countdown__labelButton}
        >
          <img src="/icons/bookmark.svg" alt="bookmark icon" />
          <span title="select label">{currentLabel}</span>
        </button>
        <Menu
          id="lock-menu"
          anchorEl={labelanchorEl}
          open={Boolean(labelanchorEl)}
          onClose={() => handleMenuClose("set label")}
          keepMounted
          PaperProps={{
            style: {
              maxHeight: 250,
            },
          }}
        >
          {labels.map((opt) => (
            <MenuItem
              key={opt.label}
              selected={opt.label == currentLabel}
              onClick={() => selectLabel(opt.label)}
            >
              {opt.label}
            </MenuItem>
          ))}
          <MenuItem
            onClick={openAddLabelModal}
            className={styles.countdown__addLabelBtn}
          >
            add new label
            <img src="/icons/add.svg" alt="add label" />
          </MenuItem>
        </Menu>

        <button
          type="button"
          onClick={(event) => openMenu(event, "set time")}
          className={styles.countdown__timeMenuButton}
        >
          <span>Set time</span> <span>{timeSet}</span>
        </button>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleMenuClose("set time")}
          keepMounted
        >
          {timeOptions.map((opt) => (
            <MenuItem
              key={opt}
              selected={opt == timeSet}
              onClick={() => selectTimeSet(opt)}
            >
              {opt}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <button
        onClick={toggleTimer}
        type="button"
        className={isTimerRunning ? styles.countdown__buttonActive : ""}
      >
        {isTimerRunning ? "Cancel" : "Train Soldier"}
      </button>
    </div>
  );
}

export default Countdown;
