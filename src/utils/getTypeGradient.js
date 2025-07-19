const typeGradients = {
  fire: "from-blue-900/20 to-red-500/60 text-white",
  water: "from-blue-900/20 to-blue-500/60 text-white",
  grass: "from-blue-900/20 to-green-500/60 text-white",
  electric: "from-blue-900/20 to-yellow-400/60 text-black", 
  ice: "from-blue-900/20 to-cyan-300/60 text-black", 
  fighting: "from-blue-900/20 to-orange-700/60 text-white",
  poison: "from-blue-900/20 to-purple-700/60 text-white",
  ground: "from-blue-900/20 to-yellow-800/60 text-white",
  flying: "from-blue-900/20 to-sky-400/60 text-black",
  psychic: "from-blue-900/20 to-pink-500/60 text-black",
  bug: "from-blue-900/20 to-green-700/60 text-white",
  rock: "from-blue-900/20 to-stone-500/60 text-white",
  ghost: "from-blue-900/20 to-indigo-700/60 text-white",
  dark: "from-blue-900/20 to-gray-900/60 text-white",
  dragon: "from-blue-900/20 to-purple-600/60 text-white",
  steel: "from-blue-900/20 to-gray-400/60 text-black",
  fairy: "from-blue-900/20 to-pink-400/60 text-black",
  normal: "from-blue-900/20 to-gray-300/60 text-black",
  default: "from-blue-900/20 to-zinc-400/60 text-black",
};

const getTypeGradient = (type) => {
  return `bg-gradient-to-br ${
    typeGradients[type.toLowerCase()] || typeGradients.default
  }`;
};

export default getTypeGradient;
