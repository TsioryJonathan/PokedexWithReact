import { useEffect, useState, useRef } from "react";

const evoDetailsCache = new Map();

function getChainKey(chain) {
  return chain.join(",");
}

export default function useEvolutionChainDetails(evolutionChain) {
  const key = getChainKey(evolutionChain || []);
  const [details, setDetails] = useState(() =>
    key ? evoDetailsCache.get(key) || [] : []
  );
  const [loading, setLoading] = useState(
    key ? !evoDetailsCache.has(key) : false
  );
  const [error, setError] = useState(null);
  const prevKeyRef = useRef(key);

  useEffect(() => {
    if (!evolutionChain || evolutionChain.length === 0) return;

    const cached = evoDetailsCache.get(key);
    if (cached) {
      setDetails(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    Promise.all(
      evolutionChain.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
          signal: controller.signal,
        }).then((res) => res.json())
      )
    )
      .then((data) => {
        evoDetailsCache.set(key, data);
        setDetails(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [key]);

  return { details, loading, error };
}
