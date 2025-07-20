import { useEffect, useState } from "react";

export default function useEvolutionChainDetails(evolutionChain) {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!evolutionChain || evolutionChain.length === 0) return;
    setLoading(true);
    setError(null);
    Promise.all(
      evolutionChain.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json())
      )
    )
      .then(setDetails)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [evolutionChain]);

  return { details, loading, error };
}
