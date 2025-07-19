export const PokeStatBadge = ({ pokeStatData }) => {
    if (!pokeStatData || !Array.isArray(pokeStatData)) return null;

    const filteredStats = pokeStatData.filter((stat) =>
      ["hp", "attack", "defense"].includes(stat.name.toLowerCase())
    );
  
    return (
      <div className="flex flex-col gap-2 mt-4 text-white text-sm w-40">
        {filteredStats.map((stat, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white/10 px-3 py-1 rounded"
          >
            <span className="capitalize font-semibold">{stat.name}</span>
            <span className="font-mono">{stat.value}</span>
          </div>
        ))}
      </div>
    );
  };
  