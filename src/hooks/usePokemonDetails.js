import { useEffect, useState } from "react";

export function usePokemonDetails(name) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // General Info
        const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data1 = await res1.json();

        // Species
        const res2 = await fetch(data1.species.url);
        const data2 = await res2.json();

        const flavorEntry = data2.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        const genusEntry = data2.genera.find(
          (entry) => entry.language.name === "en"
        );

        const pokemonData = {
          id: data1.id,
          name: data1.name,
          image: data1.sprites.other["official-artwork"].front_default,
          types: data1.types.map((t) => t.type.name),

          stats: data1.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),

          abilities: data1.abilities.map((a) => ({
            name: a.ability.name,
            is_hidden: a.is_hidden,
          })),

          height: data1.height,
          weight: data1.weight,
          base_experience: data1.base_experience,
          cries: data1.cries.latest,

          description: flavorEntry?.flavor_text.replace(/\f/g, " ") || "",
          genus: genusEntry?.genus || "",

          color: data2.color?.name || "green",
          habitat: data2.habitat?.name || "unknown",
          generation: data2.generation?.name || "unknown",
          shape: data2.shape?.name || "unknown",
          egg_groups: data2.egg_groups?.map((g) => g.name) || [],
          gender_rate: data2.gender_rate,
          capture_rate: data2.capture_rate,
          growth_rate: data2.growth_rate?.name || "unknown",
          is_legendary: data2.is_legendary,
          is_mythical: data2.is_mythical,
        };

        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error while fetching pokemon :", error);
        setError("Failed to fetch pokemon details. Please try again later.");
      }

      setLoading(false);
    };

    fetchData();
  }, [name]);

  return { pokemon, loading, error };
}
