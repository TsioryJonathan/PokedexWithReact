import { STAT_ORDER } from "../constants/SummaryStats";
export const SummaryStats = ({pokemon}) => {
  const stats = STAT_ORDER.map((key) =>
    pokemon.stats.find((s) => s.name === key)
  ).filter(Boolean);

  const total = stats.reduce((acc, s) => acc + s.value, 0);
  const average = (total / stats.length).toFixed(1);
  const isDark = typeof document !== "undefined" && document.body.classList.contains("dark");
  
  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 text-sm">
      <div className="bg-white/10 px-2 py-2 rounded-md backdrop-blur-sm flex items-center gap-2">
        <span className="font-semibold text-foreground/70">Average</span>
        {(() => {
          let colorClass = "";
          if (average >= 100) colorClass = isDark ? "text-green-300" : "text-green-700";
          else if (average >= 75) colorClass = isDark ? "text-yellow-300" : "text-yellow-700";
          else colorClass = isDark ? "text-red-300" : "text-red-700";
          return (
            <span className={`font-bold ${colorClass}`}>{average}</span>
          );
        })()}
      </div>
      <div className="bg-white/10 px-4 py-2 rounded-md backdrop-blur-sm flex items-center gap-2">
        <span className="font-semibold text-foreground/70">Total</span>
        {(() => {
          let colorClass = "";
          if (total >= 600) colorClass = isDark ? "text-green-300" : "text-green-700";
          else if (total >= 400) colorClass = isDark ? "text-yellow-300" : "text-yellow-700";
          else colorClass = isDark ? "text-red-300" : "text-red-700";
          return (
            <span className={`font-bold ${colorClass}`}>{total}</span>
          );
        })()}
      </div>
    </div>
  );
};