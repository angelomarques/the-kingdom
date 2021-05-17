import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import { useData } from "../contexts/DataContext";
import { getTimerUnities } from "../utils/countdownTools";

function BreakCountdown() {
  const { isBreakActive, setIsBreakActive } = useData();
  const [currentBreakTime, setCurrentBreakTime] = useState(10 * 60);
  const [breakPercentege, setBreakPercentage] = useState(100);

  const [isBreakTimeOver, setIsBreakTimeOver] = useState(false);

  function calculateBreakPercentage() {
    const percentage = (currentBreakTime / (10 * 60)) * 100;
    return setBreakPercentage(percentage);
  }

  useEffect(() => {
    if (isBreakActive && currentBreakTime != 0) {
      setTimeout(() => {
        setCurrentBreakTime(currentBreakTime - 1);
        calculateBreakPercentage();
      }, 1000);
    } else if (isBreakActive && currentBreakTime == 0) {
      setIsBreakTimeOver(true);
    }
  }, [currentBreakTime]);

  const [currentMinutes, currentSeconds] = getTimerUnities(
    currentBreakTime,
    false
  );

  function handleButtonClick() {
    setIsBreakTimeOver(false);
    return setIsBreakActive(false);
  }

  function changeAudioVolume(e) {
    const audio = e.target;
    audio.volume = 0.1;
  }

  return (
    <div className="breakCountdown">
      {isBreakTimeOver && (
        <audio
          onLoadedMetadata={changeAudioVolume}
          src="/alarm-buzzer.wav"
          autoPlay
          loop={true}
        ></audio>
      )}
      <div
        className={
          isBreakTimeOver
            ? "breakCountdown__progressbarContainer countdownOver"
            : "breakCountdown__progressbarContainer"
        }
      >
        <CircularProgressbar
          className={"breakCountdown__progressbar"}
          value={breakPercentege}
        />
        <span>{`${currentMinutes}:${currentSeconds}`}</span>
      </div>
      <button
        onClick={handleButtonClick}
        className={
          isBreakTimeOver
            ? "breakCountdown__button confirmButton"
            : "breakCountdown__button cancelButton"
        }
      >
        {isBreakTimeOver ? "Confirm" : "Cancel"}
      </button>
    </div>
  );
}

export default BreakCountdown;
