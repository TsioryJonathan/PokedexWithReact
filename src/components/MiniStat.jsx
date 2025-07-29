import useIsDarkTheme from "@/hooks/useIsDarkTheme";

const MiniStat = ({ label, value, hint }) => {
  const isDark = useIsDarkTheme();
  return (
    <div className={`${isDark ? "bg-white/10" : "bg-black/10"} rounded p-2 flex flex-col`}>
      <span className={`text-[14px] font-bold uppercase tracking-wide ${isDark ? "text-white" : "text-black/80"}`}>
        {label}
      </span>
      <span className={`text-sm font-semibold ${isDark ? "text-white/50" : "text-black/50"}`}>{value ?? "—"}</span>
      {hint && <span className={`text-[10px] ${isDark ? "text-white/40" : "text-black/40"}`}>{hint}</span>}
    </div>
  );
};

export default MiniStat;