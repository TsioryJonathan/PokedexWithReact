import React, { useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard.jsx";
import PokeBallLogo from "./PokeBallLogo.jsx";

const PokeCardDisplayer = ({ page, pokemonList, itemsPerPage, searchTerm }) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const toShow = pokemonList.slice(startIndex, endIndex);
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);
  let filtered = [];
  if (searchTerm) {
    filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

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
      {filtered.length > 0 ? (
        filtered.map((pokemon, i) => (
          <PokemonCard pokemonName={pokemon.name} key={i} />
        ))
      ) : searchTerm && filtered.length === 0 ? (
        <div className="col-span-4 text-center">
          <PokeBallLogo className="w-20 h-20 mx-auto mb-4" />
          <h2 className="text-lg font-bold">No Pokémon found</h2>
          <p className="text-gray-500">Try a different search term.</p>
        </div>
      ) : (
        toShow.map((pokemon, i) => (
          <PokemonCard pokemonName={pokemon.name} key={i} />
        ))
      )}
    </section>
  );
};

export default PokeCardDisplayer;
