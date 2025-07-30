import { FaCrown, FaDragon, FaBaby } from "react-icons/fa";
import { Badge } from "../ui/badge";

function Badges({ pokemon, pretty }) {
  return (
    <div className="flex flex-wrap gap-2">
      {pokemon.is_legendary && (
        <Badge className="bg-yellow-500 text-black font-semibold flex items-center gap-1">
          <FaCrown /> Legendary
        </Badge>
      )}
      {pokemon.is_mythical && (
        <Badge className="bg-pink-500 text-white font-semibold flex items-center gap-1">
          <FaDragon /> Mythical
        </Badge>
      )}
      {pokemon.is_baby && (
        <Badge className="bg-teal-500 text-white font-semibold flex items-center gap-1">
          <FaBaby /> Baby
        </Badge>
      )}
      <Badge className="bg-white/20 font-semibold">{pretty(pokemon.generation)}</Badge>
      <Badge className="bg-white/10 font-semibold">{pretty(pokemon.shape)} Shape</Badge>
      <Badge className="bg-white/10 font-semibold">Color: {pretty(pokemon.color)}</Badge>
    </div>
  );
}

export default Badges;