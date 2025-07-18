import { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../api/pokemon";

function usePokemonDetails(nameOrId) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nameOrId) return;

    const getPokemonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPokemonDetails(nameOrId);
        setPokemon(data);
      } catch (err) {
        setError("Erreur lors du chargement du Pokémon.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPokemonDetails();
  }, [nameOrId]);

  return { pokemon, loading, error };
}

export default usePokemonDetails;
