import { CircularProgressbar } from "react-circular-progressbar";

function BreakCountdown() {
  return (
    <div className="breakCountdown">
      <div className="breakCountdown__progressbarContainer">
        <CircularProgressbar
          className={"breakCountdown__progressbar"}
          value={70}
        />
        <span>09:13</span>
      </div>
      <button className="breakCountdown__button">Cancel</button>
    </div>
  );
}

export default BreakCountdown;
