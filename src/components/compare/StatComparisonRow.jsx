import { getStatColor, statIcons, prettyName } from "@/constants/SummaryStats";

export default function StatComparisonRow({ stat, v }) {
  const renderBar = (v, statName, dir) => {
    const pct = Math.min((v / 255) * 100, 100);
    const color = getStatColor(statName);
    return (
      <div dir={dir} className="w-full h-1 rounded-full bg-gray-400/50 shadow-inner">
        <div
          className={`h-full rounded-full ${color} shadow transition-all duration-300`}
          style={{ width: pct + 10 + "%" }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1 rounded-lg px-1 py-1 shadow-sm">
      <div className="flex items-center justify-between gap-1 text-sm font-semibold">
        <span className="flex items-center gap-1 min-w-[110px]">
          {statIcons[stat]}
          <span className="capitalize text-[var(--primary)] font-bold text-xs">
            {prettyName(stat)}
          </span>
        </span>
        <span className="font-mono text-sm text-green-400">{v}</span>
      </div>
      {renderBar(v, stat, "ltr")}
    </div>
  );
}
