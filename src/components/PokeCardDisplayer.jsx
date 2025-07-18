import React from "react";
import PokemonCard from "./PokemonCard.jsx";

export const PokeCardDisplayer = ({ pokemonList, page, itemsPerPage }) => {

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const toShow = pokemonList.slice(startIndex, endIndex);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {toShow.map((pokemon, i) => (
        <PokemonCard pokemonName={pokemon.name} key={i} />
      ))}
    </div>
  );
};
