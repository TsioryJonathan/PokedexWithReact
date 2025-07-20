import { STAT_ORDER } from "../constants/SummaryStats";
export const SummaryStats = ({pokemon}) => {
  const stats = STAT_ORDER.map((key) =>
    pokemon.stats.find((s) => s.name === key)
  ).filter(Boolean);

  const total = stats.reduce((acc, s) => acc + s.value, 0);
  const average = (total / stats.length).toFixed(1);

  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 text-sm">
      <div className="bg-white/10 px-2 py-2 rounded-md backdrop-blur-sm flex items-center gap-2">
        <span className="font-semibold text-white/70">Average</span>
        <span
          className={`font-bold ${
            average >= 100
              ? "text-green-300"
              : average >= 75
              ? "text-yellow-300"
              : "text-red-300"
          }`}
        >
          {average}
        </span>
      </div>
      <div className="bg-white/10 px-4 py-2 rounded-md backdrop-blur-sm flex items-center gap-2">
        <span className="font-semibold text-white/70">Total</span>
        <span
          className={`font-bold ${
            total >= 600
              ? "text-green-400"
              : total >= 450
              ? "text-yellow-300"
              : "text-red-300"
          }`}
        >
          {total}
        </span>
      </div>
    </div>
  );
};