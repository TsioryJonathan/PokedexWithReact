import React from "react";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import pokemonColors from "../utils/pokemonColors";
import GlobalDetailSkeleton from "./GlobalDetailSkeleton";
import getTypeIcon from "../utils/getTypeIcon";
import { Volume2 } from "lucide-react";

function GlobalDetail({ name }) {
  const { pokemon, loading, error } = usePokemonDetails(name);
  const Icon = getTypeIcon(pokemon?.types?.[0] || "normal");

  if (loading) return <GlobalDetailSkeleton />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  console.log(pokemon.cries);

  return (
    <div
      className="px-10 rounded-2xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 md:min-w-[1012px] md:min-h-[100px] w-full h-fit"
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
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="bg-white/20 px-3 py-1 rounded-lg capitalize text-sm font-medium"
            >
              <Icon className="inline mr-1" />
              {type}
            </span>
          ))}
        </div>
        {pokemon.cries && (
          <button
            onClick={() => new Audio(pokemon.cries).play()}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          >
            <Volume2 className="w-4 h-4" />
            Écouter le cri
          </button>
        )}
      </div>
    </div>
  );
}

export default GlobalDetail;
