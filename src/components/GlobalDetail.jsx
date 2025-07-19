import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import pokemonColors from "@/utils/pokemonColors";
import GlobalDetailSkeleton from "./GlobalDetailSkeleton";
import PokeTypeBadge from "./PokeTypeBadge";
import { Button } from "./ui/button";
import { Volume2 } from "lucide-react";

function GlobalDetail({ name }) {
  const { pokemon, loading, error } = usePokemonDetails(name);
  if (loading) return <GlobalDetailSkeleton />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div
      className="rounded-2xl shadow-xl text-white flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full px-6 py-4 relative"
      style={{
        backgroundColor: pokemonColors[pokemon.color] || pokemonColors.default,
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
      }}
    >
      {/* Image */}
      <div className="w-full md:w-1/3 flex justify-center items-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="w-full md:w-2/3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
          <span className="text-xl text-white/50 font-semibold">
            #{pokemon.id}
          </span>
        </div>

        <span className="text-sm text-white/80">{pokemon.genus}</span>
        <p className="italic text-sm leading-snug">{pokemon.description}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {pokemon.types.map((t) => (
            <PokeTypeBadge key={t} type={t} />
          ))}
        </div>

        {pokemon.cries && (
          <Button
            onClick={() => new Audio(pokemon.cries).play()}
            className="mt-3 w-fit px-3 py-1 flex items-center gap-2 rounded-full hover:bg-white/20 bg-white/10 text-white"
          >
            <Volume2 className="w-4 h-4" />
            Cry
          </Button>
        )}
      </div>
    </div>
  );
}
export default GlobalDetail;
