import { useState, useEffect } from "react";

const moveCache = new Map();

export function useMoveDetails(move) {
  const normalized = move?.toLowerCase() || "";
  const [data, setData] = useState(() =>
    normalized ? moveCache.get(normalized) || null : null
  );
  const [loading, setLoading] = useState(
    normalized ? !moveCache.has(normalized) : false
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!normalized) return;

    const cached = moveCache.get(normalized);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    let url;
    if (move.startsWith("http://") || move.startsWith("https://")) {
      url = move;
    } else {
      url = `https://pokeapi.co/api/v2/move/${normalized}`;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        moveCache.set(normalized, json);
        setData(json);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Failed to fetch move details:", err);
        setError(err.message || "Unknown error");
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [normalized, move]);

  return { move: data, loading, error };
}
