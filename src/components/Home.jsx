import PokemonList from "@/components/PokemonList";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

function Home() {
  const isDark = useTheme();
  return (
    <div
      className={`min-w-screen min-h-screen px-10 py-10 pb-20 ${
        isDark ? "bg-slate-950/40" : "bg-slate-400/40"
      }`}
      id="pokedex-section"
    >
      <PokemonList />
    </div>
  );
}

export default Home;
