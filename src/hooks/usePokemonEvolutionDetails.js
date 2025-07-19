import { useEffect, useState } from "react";

const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

function usePokemonEvolutionDetails(name) {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchEvolutionChain = async () => {
      try {
        setLoading(true);
        setError(null);
        const speciesRes = await fetch(`${SPECIES_URL}/${name}`);
        const speciesData = await speciesRes.json();
        const evoChainUrl = speciesData.evolution_chain.url;
        const evoRes = await fetch(evoChainUrl);
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

        setEvolutionChain(chain);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch evolution chain");
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [name]);

  return { evolutionChain, loading, error };
}

export default usePokemonEvolutionDetails;
