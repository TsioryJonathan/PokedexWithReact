import { useEffect, useState } from "react";

export function usePokemonDetails(name) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res1 = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        if (!res1.ok) throw new Error("Pokemon not found");
        const data1 = await res1.json();

        const res2 = await fetch(data1.species.url);
        if (!res2.ok) throw new Error("Species not found");
        const data2 = await res2.json();

        const flavorEntry = data2.flavor_text_entries.find(
          (e) => e.language.name === "en"
        );
        const genusEntry = data2.genera.find((g) => g.language.name === "en");

        const cleanFlavor =
          flavorEntry?.flavor_text
            ?.replace(/\f/g, " ")
            ?.replace(/\n|\r/g, " ")
            ?.trim() || "";

        const evYields = data1.stats
          .filter((s) => s.effort > 0)
          .map((s) => ({
            stat: s.stat.name,
            effort: s.effort,
          }));

        const abilities = data1.abilities.map((a) => ({
          name: a.ability.name,
          is_hidden: a.is_hidden,
        }));

        const heldItems = data1.held_items.map((h) => h.item.name);

        const image =
          data1.sprites.other["official-artwork"].front_default ||
          data1.sprites.other.dream_world.front_default ||
          data1.sprites.front_default ||
          "";

        const pokemonData = {
          id: data1.id,
          name: data1.name,
          image,
          types: data1.types.map((t) => t.type.name),
          stats: data1.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
            effort: s.effort,
          })),
          abilities,
          weight: data1.weight,
          height: data1.height,
          base_experience: data1.base_experience,
          forms: data1.forms.map((f) => f.name),
          held_items: heldItems,

          description: cleanFlavor,
          genus: genusEntry?.genus || "",
          color: data2.color?.name || "gray",
          gender_rate: data2.gender_rate,
          egg_groups: data2.egg_groups.map((g) => g.name),
          growth_rate: data2.growth_rate.name,
          shape: data2.shape?.name,
          habitat: data2.habitat?.name || "unknown",
          capture_rate: data2.capture_rate,
          base_happiness: data2.base_happiness,
          hatch_counter: data2.hatch_counter,
          is_legendary: data2.is_legendary,
          is_mythical: data2.is_mythical,
          is_baby: data2.is_baby,
          generation: data2.generation?.name,
          cries: data1.cries?.latest || null,
          ev_yields: evYields,
          moves: data1.moves.map((m) => m.move.name),
        };

        setPokemon(pokemonData);
      } catch (e) {
        console.error(e);
        setError(e.message || "Failed to fetch pokemon details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return { pokemon, loading, error };
}
