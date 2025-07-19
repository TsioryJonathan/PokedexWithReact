import React from "react";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import pokemonColors from "../utils/pokemonColors";
import GlobalDetailSkeleton from "./GlobalDetailSkeleton";
import { Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import PokeTypeBadge from "./PokeTypeBadge";

function GlobalDetail({ name }) {
  const { pokemon, loading, error } = usePokemonDetails(name);
  if (loading) return <GlobalDetailSkeleton />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div
      className="px-10 rounded-2xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 md:min-w-[1012px] md:min-h-[100px] w-full h-fit relative"
      style={{
        backgroundColor: pokemonColors[pokemon.color] || pokemonColors.default,
      }}
    >
      {/* Image */}
      <div className="w-full md:w-2/5 flex items-center justify-center relative">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-full max-w-[300px] object-contain "
          loading="lazy"
        />
      </div>
      {/* Info */}
      <div className="flex flex-col w-full md:w-3/5 gap-2 py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl md:text-5xl font-bold capitalize">
            {pokemon.name}
          </h2>

          <span className=" text-3xl text-white/40 font-semibold">
            #{pokemon.id}
          </span>
        </div>

        <span className="text-sm text-gray-200">{pokemon.genus}</span>
        <p className="italic text-sm md:text-base">{pokemon.description}</p>

        <div className="flex gap-3 flex-wrap mt-4">
          {pokemon.types.map((t) => (
            <PokeTypeBadge type={t} key={t} />
          ))}
        </div>

        {pokemon.cries && (
          <Button
            onClick={() => new Audio(pokemon.cries).play()}
            className="absolute bottom-10 right-10 flex items-center gap-2 w-fit px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer font-bold"
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
