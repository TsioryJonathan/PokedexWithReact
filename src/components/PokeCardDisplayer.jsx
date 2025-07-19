import React, { useEffect } from "react";
import PokemonCard from "./PokemonCard.jsx";

const PokeCardDisplayer = ({page, pokemonList, itemsPerPage }) => {
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const toShow = pokemonList.slice(startIndex, endIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
      {toShow.map((pokemon, i) => (
        <PokemonCard pokemonName={pokemon.name} key={i} />
      ))}
    </div>
  );
};

export default PokeCardDisplayer;
