export default function StatComparison({ pokemon1, pokemon2 }) {
  if (!pokemon1 || !pokemon2) return null;
  const renderBar = (v, dir) => {
    const pct = Math.min((v / 255) * 100, 100);
    const color =
      v < 50 ? "bg-red-500" : v < 90 ? "bg-yellow-400" : "bg-green-500";
    return (
      <div dir={dir} className="w-full h-3 rounded-full bg-muted shadow-inner">
        <div
          className={`h-full rounded-full ${color} shadow transition-all duration-300`}
          style={{ width: pct + "%" }}
        />
      </div>
    );
  };
  return (
    <div className="mt-8 p-4 bg-destructive-foreground rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Comparaison des statistiques
      </h2>
      {pokemon1.stats.map((stat, i) => (
        <div key={stat.name} className="mb-4">
          <div className="flex justify-between text-sm font-medium">
            <span>{stat.value}</span>
            <span>{stat.name.toUpperCase()}</span>
            <span>{pokemon2.stats[i].value}</span>
          </div>
          <div className="grid grid-cols-2 mt-1">
            {renderBar(stat.value, "rtl")}
            {renderBar(pokemon2.stats[i].value, "ltr")}
          </div>
        </div>
      ))}
    </div>
  );
}
