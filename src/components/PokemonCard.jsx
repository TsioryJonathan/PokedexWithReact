import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import getTypeColor from "@/utils/getTypeColor";
import getTypeEmoji from "@/utils/getTypeEmoji";
import { Link } from "react-router-dom";

function PokemonCard({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);

  if (loading || !pokemon) {
    return (
      <div className="h-72 w-full flex items-center justify-center bg-gray-100 rounded-xl shadow animate-pulse">
        <p className="text-gray-400">Loading {pokemonName}...</p>
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center">Error</div>;

  return (
    <Link
      key={pokemon.id}
      className={`relative to-white rounded-xl shadow-md p-5 text-center border-gray-300 h-fit pb-10 group transition-transform duration-300 ease-in-out ${getTypeColor(
        pokemon.types[0].toLowerCase()
      )} `}
      to={`pokemon/${pokemon.name}`}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-lg overflow-hidden">
        {/* Background decorative image */}
        <img
          src="/src/assets/BG.png"
          className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-75 "
        />
        {/* Pokemon image */}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative z-10 max-h-full object-contain group-hover:scale-105 transition-all ease-in-out duration-150"
        />
      </div>

      {/* Text Info */}
      <h1 className="text-2xl font-extrabold mt-4 capitalize text-gray-900">
        {pokemon.name}
      </h1>
      <h2 className="text-sm text-gray-600 mb-3">#{pokemon.id}</h2>

      {/* Types */}
      <div className="flex justify-center gap-2 mt-2 text-sm font-medium">
        {pokemon.types.map((t) => (
          <div className="bg-gray-200/50 px-2 py-1 rounded-md flex gap-2 items-center">
            <span>{getTypeEmoji(t)}</span>
            {t}
          </div>
        ))}
      </div>
    </Link>
  );
}

export default PokemonCard;
