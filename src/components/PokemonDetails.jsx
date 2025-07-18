import React from "react";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import pokemonColors from "../utils/pokemonColors";

function PokemonDetails({ name }) {
  const { pokemon, loading, error } = usePokemonDetails(name);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className={`m-10 p-10 rounded-lg flex items-center justify-between relative text-white shadow-lg`}
      style={{
        backgroundColor: pokemonColors[pokemon.color] || pokemonColors.default,
      }}
    >
      <div className="w-[40%] flex items-center justify-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-[80%] object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex flex-col w-[60%] ">
        <h2 className="text-5xl font-bold capitalize">{pokemon.name}</h2>

        <p className="italic mt-2">{pokemon.description}</p>

        <h3 className="font-semibold mt-4">{pokemon.genus}</h3>
      </div>

      <div className="absolute top-10 right-10 text-2xl text-gray-500">
        (#{pokemon.id})
      </div>
    </div>
  );
}

export default PokemonDetails;
