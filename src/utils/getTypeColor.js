const typeColors = {
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-white",
  ice: "bg-cyan-300 text-white",
  fighting: "bg-orange-700 text-white",
  poison: "bg-purple-700 text-white",
  ground: "bg-yellow-800 text-white",
  flying: "bg-sky-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-green-700 text-white",
  rock: "bg-stone-500 text-white",
  ghost: "bg-indigo-700 text-white",
  dark: "bg-gray-900 text-white",
  dragon: "bg-purple-600 text-white",
  steel: "bg-gray-400 text-white",
  fairy: "bg-pink-400 text-white",
  normal: "bg-gray-700 text-white",
  default: "bg-zinc-400 text-white",
};

const getTypeColor = (type) => {
  return typeColors[type] || "bg-gray-300";
};

export default getTypeColor;
