import { useEffect, useState } from "react";

export function usePokemonDetails(name) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log("usePokemonDetails effect triggered with name:", name);

    if (!name) return;
    const fetchData = async () => {
      setLoading(true);

      try {
        const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data1 = await res1.json();

        const res2 = await fetch(data1.species.url);
        const data2 = await res2.json();

        const flavorEntry = data2.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        const genusEntry = data2.genera.find(
          (entry) => entry.language.name === "en"
        );

        const color = data2.color.name || "green";

        const pokemonData = {
          id: data1.id,
          name: data1.name,
          image: data1.sprites.other["official-artwork"].front_default,
          types: data1.types.map((t) => t.type.name),
          stats: data1.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          height: data1.height,
          weight: data1.weight,
          description: flavorEntry?.flavor_text.replace(/\f/g, " ") || "",
          genus: genusEntry?.genus || "",
          color: color,
          cries: data1.cries.latest,
        };
        setPokemon(pokemonData);
      } catch (error) {
        setError("Failed to fetch pokemon details. Please try again later.");
        console.error("Error while fetching pokemon :", error);
      }

      setLoading(false);
    };
    fetchData();
  }, [name]);
  return { pokemon, loading, error };
}
