import PokemonList from "@/components/PokemonList";
import React from "react";

function Home() {
  return (
    <div
      className="min-w-screen min-h-screen bg-gray-950 px-10 py-10"
      id="pokedex-section"
    >
      <PokemonList />
    </div>
  );
}

export default Home;
