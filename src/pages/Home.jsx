import { PokemonList } from "@/components/PokemonList";
import React from "react";

function Home() {
  console.log("Home render");

  return (
    <div className="min-w-screen min-h-screen bg-background px-10 py-10">
      <PokemonList />
    </div>
  );``
}

export default Home;
