import { GiHeartPlus, GiShield, GiBroadsword } from "react-icons/gi";

export const PokeStatBadge = ({ pokeStatData }) => {
  if (!pokeStatData || !Array.isArray(pokeStatData)) return null;

  const filteredStats = pokeStatData.filter((stat) =>
    ["hp", "attack", "defense"].includes(stat.name.toLowerCase())
  );

  const statIcons = {
    hp: <GiHeartPlus className="text-pink-400" />,
    attack: <GiBroadsword className="text-orange-400" />,
    defense: <GiShield className="text-blue-400" />,
  };

  const statColors = {
    hp: "bg-pink-500",
    attack: "bg-orange-500",
    defense: "bg-blue-500",
  };

  return (
    <div className="flex flex-col gap-2 mt-4 text-white text-sm w-40">
      {filteredStats.map((stat, index) => {
        const name = stat.name.toLowerCase();
        const percentage = Math.min((parseFloat(stat.value) * 100) / 255, 100);

        return (
          <div
            key={index}
            className="flex justify-between items-center bg-white/10 px-3 py-1 rounded relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 h-full z-0 transition-all duration-700 ease-in-out ${statColors[name]}`}
              style={{ width: `${percentage}%` }}
            />
            <span className="capitalize font-semibold z-10 flex items-center gap-2">
              {statIcons[name]} {stat.name}
            </span>
            <span className="font-mono z-10">{stat.value}</span>
          </div>
        );
      })}
    </div>
  );
};
