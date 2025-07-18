const typeColors = {
  plant: "bg-lime-300",
  poison: "bg-purple-400",
  pire: "bg-orange-400",
  flying: "bg-sky-300",
  water: "bg-blue-300",
  electric: "bg-yellow-300 text-black",
  psychic: "bg-pink-400",
  grass: "bg-green-400",
  bug: "bg-lime-500",
  normal: "bg-gray-300",
};

const getTypeColor = (type) => {
  return typeColors[type] || "bg-gray-300";
};

export default getTypeColor;
