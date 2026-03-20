import OwnedPokemonCard from "@/components/create-pokemon/OwnedPokemonCard";
import React, { useEffect, useState } from "react";

export default function MyPokemon() {
  const [savedPokemon, setSavedPokemon] = useState([]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("my_pokemon");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedPokemon(parsed);
      }
    } catch (error) {
      console.error("Error retrieving saved pokemon" + error);
    }
  }, []);

  useEffect(() => {
    const updateSavedPokemon = () => {
      try {
        const saved = localStorage.getItem("my_pokemon");
        if (saved) setSavedPokemon(JSON.parse(saved));
      } catch (error) {
        console.error("Error retrieving saved pokemon: ", error);
      }
    };

    window.addEventListener("my_pokemon_updated", updateSavedPokemon);

    return () => {
      window.removeEventListener("my_pokemon_updated", updateSavedPokemon);
    };
  }, []);

  return (
    <div className="p-10 flex flex-col gap-20 items-center ">
      <h1 className="text-center font-bold text-5xl">Saved Pokemon </h1>
      <div className="grid grid-cols-3 gap-20">
        {savedPokemon.map((poke, i) => (
          <OwnedPokemonCard pokemon={poke} key={i} />
        ))}
      </div>
    </div>
  );
}
