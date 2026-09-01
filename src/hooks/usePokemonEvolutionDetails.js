import { useEffect, useState } from "react";

const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";
const evoChainCache = new Map();

function usePokemonEvolutionDetails(name) {
  const normalized = name?.toLowerCase() || "";
  const [evolutionChain, setEvolutionChain] = useState(() =>
    normalized ? evoChainCache.get(normalized) || [] : []
  );
  const [loading, setLoading] = useState(
    normalized ? !evoChainCache.has(normalized) : false
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!normalized) return;

    const cached = evoChainCache.get(normalized);
    if (cached) {
      setEvolutionChain(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchEvolutionChain = async () => {
      try {
        setLoading(true);
        setError(null);
        const speciesRes = await fetch(`${SPECIES_URL}/${normalized}`, {
          signal: controller.signal,
        });
        const speciesData = await speciesRes.json();
        const evoChainUrl = speciesData.evolution_chain.url;
        const evoRes = await fetch(evoChainUrl, { signal: controller.signal });
        const evoData = await evoRes.json();

        const chain = [];
        let current = evoData.chain;

        while (current) {
          chain.push(current.species.name);
          if (current.evolves_to.length > 0) {
            current = current.evolves_to[0];
          } else {
            current = null;
          }
        }

        evoChainCache.set(normalized, chain);
        setEvolutionChain(chain);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError("Failed to fetch evolution chain");
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionChain();

    return () => controller.abort();
  }, [normalized]);

  return { evolutionChain, loading, error };
}

export default usePokemonEvolutionDetails;
