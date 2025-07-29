import assets from "@/assets/assets";
import PokemonList from "@/components/PokemonList";
import useDarkTheme from "@/hooks/useDarkTheme";
import React from "react";

function Home() {
  const isDark = useDarkTheme();
  return (
    <div
      className={`min-w-screen min-h-screen px-10 py-10 pb-20 ${
        isDark ? "bg-gray-950" : "bg-slate-300"
      }`}
      id="pokedex-section"
      style={{
        backgroundImage: `url(${
          isDark ? assets.darkModeBg : assets.lightModeBg
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <PokemonList />
    </div>
  );
}

export default Home;
