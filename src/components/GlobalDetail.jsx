import React from "react";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import pokemonColors from "../utils/pokemonColors";
import getTypeEmoji from "../utils/getTypeEmoji";

function GlobalDetail({ name }) {
  const { pokemon, loading, error } = usePokemonDetails(name);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div
      className="m-6 p-6 md:m-10 md:p-10 rounded-2xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6"
      style={{
        backgroundColor: pokemonColors[pokemon.color] || pokemonColors.default,
      }}
    >
      {/* Image */}
      <div className="w-full md:w-2/5 flex items-center justify-center relative">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-[80%] max-w-[300px] object-contain"
          loading="lazy"
        />
      </div>
      {/* Info */}
      <div className="flex flex-col w-full md:w-3/5 gap-2">
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
              {getTypeEmoji(type)}
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GlobalDetail;
