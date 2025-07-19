import { usePokemonDetails } from "@/hooks/usePokemonDetails";

function PokemonMoves({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const moves = pokemon?.moves || [];

  if (loading) return <p>Loading moves...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-80 overflow-y-auto text-sm">
      {moves.map((move, i) => (
        <li key={i} className="capitalize bg-white/5 rounded px-3 py-1">
          {move.replace(/-/g, " ")}
        </li>
      ))}
    </ul>
  );
}

export default PokemonMoves;
