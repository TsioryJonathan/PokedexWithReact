import StatComparisonRow from "./StatComparisonRow";

export default function StatComparison({ pokemon, className }) {
  if (!pokemon) return null;
  return (
    <div className={`p-4 rounded-xl backdrop-brightness-110 backdrop-blur-xl shadow-lg border border-[var(--border)] ${className}`}>
      <div className="flex flex-col gap-4">
        {pokemon.stats.map((v) => (
          <StatComparisonRow
            key={v.name}
            stat={v.name}
            v={v.value}
          />
        ))}
      </div>
    </div>
  );
}
