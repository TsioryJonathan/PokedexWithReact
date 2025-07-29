import useDarkTheme from "@/hooks/useDarkTheme";

const MiniStat = ({ label, value, hint }) => {
  const isDark = useDarkTheme();
  return (
    <div
      className={`${
        isDark ? "bg-white/10" : "bg-black/10"
      } rounded p-2 flex flex-col`}
    >
      <span
        className={`text-[14px] font-bold uppercase tracking-wide text-white`}
      >
        {label}
      </span>
      <span className={`text-sm font-semiboldtext-white`}>{value ?? "—"}</span>
      {hint && (
        <span
          className={`text-[10px] ${isDark ? "text-white" : "text-white"}`}
        >
          {hint}
        </span>
      )}
    </div>
  );
};

export default MiniStat;
