// utils/getTypeIcon.jsx
import {
  FaFire,
  FaWater,
  FaLeaf,
  FaBolt,
  FaSnowflake,
  FaFistRaised,
  FaSkull,
  FaGlobe,
  FaFeatherAlt,
  FaBug,
  FaMountain,
  FaGhost,
  FaMoon,
  FaDragon,
  FaCog,
  FaMagic,
  FaCircle,
  FaQuestion,
  FaBrain,
} from "react-icons/fa";

const iconMap = {
  fire: FaFire,
  water: FaWater,
  grass: FaLeaf,
  electric: FaBolt,
  ice: FaSnowflake,
  fighting: FaFistRaised,
  poison: FaSkull,
  ground: FaGlobe,
  flying: FaFeatherAlt,
  bug: FaBug,
  rock: FaMountain,
  ghost: FaGhost,
  dark: FaMoon,
  dragon: FaDragon,
  steel: FaCog,
  fairy: FaMagic,
  normal: FaCircle,
  psychic: FaBrain,
};

export default function getTypeIcon(type) {
  return iconMap[type.toLowerCase()] || FaQuestion;
}
