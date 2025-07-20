import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function StatCircle({ value, max = 255, label }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-16 flex flex-col items-center">
      <CircularProgressbar
        value={pct}
        text={value}
        strokeWidth={10}
        styles={buildStyles({
          textSize: "28px",
          pathColor: "#F59E0B",
          trailColor: "rgba(255,255,255,0.12)",
          textColor: "#fff",
        })}
      />
      <span className="mt-2 text-[14px] uppercase font-semibold text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default StatCircle;
