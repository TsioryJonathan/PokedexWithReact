import { Heart, Zap, Swords, Shield, Sparkles, Brain } from "lucide-react";

export const STAT_ORDER = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

export const statIcons = {
  hp: <Heart className="text-red-400" />,
  attack: <Swords className="text-orange-400" />,
  defense: <Shield className="text-yellow-400" />,
  "special-attack": <Sparkles className="text-purple-400" />,
  "special-defense": <Brain className="text-indigo-400" />,
  speed: <Zap className="text-green-400" />,
};

export const getStatColor = (name) => {
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

export const prettyName = (name) =>
  name
    .replace("special-", "sp. ")
    .replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
