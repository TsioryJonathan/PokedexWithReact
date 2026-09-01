import React, { useRef, useEffect, useMemo } from "react";
import PokemonCard from "./PokemonCard.jsx";
import PokeBallLogo from "./PokeBallLogo.jsx";

const PokeCardDisplayer = ({ page, pokemonList, itemsPerPage, loading }) => {
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

  if (loading) {
    return (
      <section
        className="grid grid-cols-1 lg:grid-cols-3 gap-22"
        id="pokemon-list"
        ref={containerRef}
      />
    );
  }

  if (!pokemonList || pokemonList.length === 0) {
    return (
      <section
        className="grid grid-cols-1 lg:grid-cols-3 gap-22"
        id="pokemon-list"
        ref={containerRef}
      >
        <div className="col-span-4 text-center">
          <PokeBallLogo className="w-20 h-20 mx-auto mb-4" />
          <h2 className="text-lg font-bold">No Pokémon found</h2>
          <p className="text-gray-500">Try a different search term.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-3 gap-22"
      id="pokemon-list"
      ref={containerRef}
    >
      {pokemonList.map((pokemon, i) => (
        <PokemonCard pokemonName={pokemon.name} key={pokemon.name || i} />
      ))}
    </section>
  );
};

export default PokeCardDisplayer;
