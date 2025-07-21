import React, { useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard.jsx";

const PokeCardDisplayer = ({ page, pokemonList, itemsPerPage }) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const toShow = pokemonList.slice(startIndex, endIndex);
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [page]);

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6"
      id="pokemon-list"
      ref={containerRef}
    >
      {toShow.map((pokemon, i) => (
        <PokemonCard pokemonName={pokemon.name} key={i} />
      ))}
    </section>
  );
};

export default PokeCardDisplayer;
