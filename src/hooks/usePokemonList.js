import { useState, useEffect } from "react";
import { fetchPokemonList } from "../api/pokemon";

function usePokemonList(limit = 20, offset = 0) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonList(limit, offset);
        setPokemonList(data);
      } catch (err) {
        setError("Erreur lors du chargement des Pokémon.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, offset]);

  return { pokemonList, loading, error };
}

export default usePokemonList;
