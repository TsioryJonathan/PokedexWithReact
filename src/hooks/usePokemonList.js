import { useState, useEffect } from "react";
import { fetchPokemonList } from "../api/pokemon";

function usePokemonList(offset = 0) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonList(offset);
        setPokemonList(data);
      } catch (err) {
        setError("Error while loading pokemons.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  return { pokemonList, loading, error };
}

export default usePokemonList;
