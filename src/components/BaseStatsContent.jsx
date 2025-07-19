import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import pokemonColors from "@/utils/pokemonColors";
import { FaHeart, FaBolt } from "react-icons/fa";
import { GiBroadsword, GiShield, GiMagicPalm, GiBrain } from "react-icons/gi";

const STAT_ORDER = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

const statIcons= {
  hp: <FaHeart className="text-red-400" />,
  attack: <GiBroadsword className="text-orange-400" />,
  defense: <GiShield className="text-yellow-400" />,
  "special-attack": <GiMagicPalm className="text-purple-400" />,
  "special-defense": <GiBrain className="text-indigo-400" />,
  speed: <FaBolt className="text-green-400" />,
};

const getStatColor = (name) => {
  switch (name) {
    case "hp":
      return "bg-red-500";
    case "attack":
      return "bg-orange-500";
    case "defense":
      return "bg-yellow-500";
    case "special-attack":
      return "bg-purple-500";
    case "special-defense":
      return "bg-indigo-500";
    case "speed":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

const prettyName = (name) =>
  name
    .replace("special-", "sp. ")
    .replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

function BaseStatsContent({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  if (error || !pokemon) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  // Réordonner & filtrer
  const stats = STAT_ORDER.map((key) =>
    pokemon.stats.find((s) => s.name === key)
  ).filter(Boolean);

  const total = stats.reduce((acc, s) => acc + s.value, 0);
  const average = (total / stats.length).toFixed(1);

  // Split en 2 colonnes égales
  const left = stats.slice(0, 3);
  const right = stats.slice(3);

  const StatBlock = ({ stat }) => {
    const percent = Math.min((stat.value / 255) * 100, 100);
    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center text-white">
          <span className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wide">
            {statIcons[stat.name]}
            {prettyName(stat.name)}
          </span>
          <span className="font-mono text-sm">{stat.value}</span>
        </div>
        <div className="w-full h-2.5 bg-white/10 rounded overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={`h-full ${getStatColor(stat.name)}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-full px-6 md:px-10 py-6 rounded-lg text-white"
      style={{ backgroundColor: bgColor }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colonne gauche */}
        <div className="flex flex-col gap-4">
          {left.map((stat) => (
            <StatBlock key={stat.name} stat={stat} />
          ))}
        </div>
        {/* Colonne droite */}
        <div className="flex flex-col gap-4">
          {right.map((stat) => (
            <StatBlock key={stat.name} stat={stat} />
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 text-sm">
        <div className="bg-white/10 px-4 py-2 rounded-md backdrop-blur-sm flex items-center gap-2">
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
    </div>
  );
}

export default BaseStatsContent;
