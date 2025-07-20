import PokemonList from "@/components/PokemonList";
import React from "react";

function Home() {
  return (
    <section
      className="min-w-screen min-h-screen bg-background px-10 py-10"
      id="pokemon-list"
    >
      <PokemonList />
    </section>
  );
}

export default Home;
