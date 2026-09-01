import {
  Flame,
  Droplets,
  Leaf,
  Zap,
  Snowflake,
  Swords,
  Skull,
  Globe,
  Feather,
  Bug,
  Mountain,
  Ghost,
  Moon,
  Sparkles,
  Cog,
  CircleHelp,
  Brain,
  Circle,
} from "lucide-react";

const iconMap = {
  fire: Flame,
  water: Droplets,
  grass: Leaf,
  electric: Zap,
  ice: Snowflake,
  fighting: Swords,
  poison: Skull,
  ground: Globe,
  flying: Feather,
  bug: Bug,
  rock: Mountain,
  ghost: Ghost,
  dark: Moon,
  dragon: Sparkles,
  steel: Cog,
  fairy: Sparkles,
  normal: Circle,
  psychic: Brain,
};

export default function getTypeIcon(type) {
  return iconMap[type.toLowerCase()] || CircleHelp;
}
