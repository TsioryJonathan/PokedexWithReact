import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import getTypeGradient from "@/utils/getTypeGradient";
import { Link } from "react-router-dom";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import assets from "@/assets/assets";
import PokeTypeBadge from "./PokeTypeBadge";
import { Dot } from "lucide-react";
import { Badge } from "./ui/badge";

function PokemonCard({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);

  if (loading || !pokemon) {
    return <PokemonCardSkeleton />;
  }

  if (error) return <div className="text-red-500 text-center">Error</div>;

  return (
    <Link
      key={pokemon.id}
      className={`min-w-[292px] min-h-[357px] relative rounded-xl shadow-md p-5 text-center border-gray-300 h-fit pb-10 group transition-transform duration-300 ease-in-out ${getTypeGradient(
        pokemon.types[0].toLowerCase()
      )} `}
      to={`pokemon/${pokemon.name}`}
    >
      <Badge className="absolute bottom-0 right-5 text-sm font-semibold text-white mb-3 bg-gray-300/40 flex items-center justify-center px-3">
        #{pokemon.id}
      </Badge>
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-lg overflow-hidden">
        {/* Background decorative image */}
        <img
          src={assets.bg}
          alt="Bg Pokeball"
          className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] "
        />
        {/* Pokemon image */}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative z-10 max-h-full object-contain group-hover:scale-110 transition-all ease-in-out duration-300"
        />
      </div>

      {/* Text Info */}
      <h1 className="text-2xl font-extrabold capitalize text-white">
        <span className="flex items-center justify-center">
          <Dot size={64} />
          {pokemon.name}
          <Dot size={64} />
        </span>
      </h1>

      {/* Types */}
      <div className="flex justify-center gap-2  text-sm font-medium">
        {pokemon.types.map((t) => (
          <PokeTypeBadge type={t} key={t} />
        ))}
      </div>
    </Link>
  );
}

export default PokemonCard;
