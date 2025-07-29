import { useState, useEffect } from "react";

export function useMoveDetails(move) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!move) return;
    let url;
    if (move.startsWith("http://") || move.startsWith("https://")) {
      url = move;
    } else {
      url = `https://pokeapi.co/api/v2/move/${move.toLowerCase()}`;
    }

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.error("Failed to fetch move details:", err);
        setError(err.message || "Unknown error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [move]);

  return { move: data, loading, error };
}
