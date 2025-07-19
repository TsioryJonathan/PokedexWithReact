import PokemonList from "@/components/PokemonList";
import React from "react";

function Home() {
  return (
    <div className="min-w-screen min-h-screen bg-background p-3 md:px-10 md:py-10">
      <PokemonList />
    </div>
  );
}

export default Home;
