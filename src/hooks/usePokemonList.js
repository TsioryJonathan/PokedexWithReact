import { useState, useEffect, useCallback } from "react";
import { fetchPokemonPage, fetchAllPokemonNames } from "../api/pokemon";

function usePokemonList({ page = 1, itemsPerPage = 12 } = {}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allNames, setAllNames] = useState(null);
  const [namesLoading, setNamesLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const offset = (page - 1) * itemsPerPage;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results, count } = await fetchPokemonPage(itemsPerPage, offset);
        if (!cancelled) {
          setPokemonList(results);
          setTotalCount(count);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Error while loading pokemons.");
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [page, itemsPerPage]);

  const loadAllNames = useCallback(async () => {
    if (allNames) return allNames;
    setNamesLoading(true);
    try {
      const names = await fetchAllPokemonNames();
      setAllNames(names);
      return names;
    } finally {
      setNamesLoading(false);
    }
  }, [allNames]);

  return { pokemonList, totalCount, loading, error, allNames, namesLoading, loadAllNames };
}

export default usePokemonList;
