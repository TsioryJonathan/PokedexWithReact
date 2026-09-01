import { useTheme } from "@/contexts/ThemeContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function StatCircle({ value, max = 255, label }) {
  const isDark = useTheme();
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
          trailColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
          textColor: isDark ? "#fff" : "#000",
        })}
        className="font-semibold"
      />
      <span
        className={`mt-2 text-[14px] uppercase font-semibold ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default StatCircle;
