function getTypeEmoji(type) {
  const emojis = {
    fire: "🔥",
    water: "💧",
    grass: "🌿",
    electric: "⚡",
    ice: "❄️",
    fighting: "🥊",
    poison: "☠️",
    ground: "🌍",
    flying: "🕊️",
    psychic: "🔮",
    bug: "🐛",
    rock: "🪨",
    ghost: "👻",
    dark: "🌑",
    dragon: "🐉",
    steel: "⚙️",
    fairy: "🧚",
    normal: "🔘",
  };
  return emojis[type] || "❓";
}

export default getTypeEmoji;
