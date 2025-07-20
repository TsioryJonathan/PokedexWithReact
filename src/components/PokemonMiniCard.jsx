import getTypeGradient from "@/utils/getTypeGradient";
import PokeTypeBadge from "./PokeTypeBadge";
import {Skeleton} from "@mui/material";

export default function PokemonMiniCard({ pokemon }) {
  if (!pokemon)
    return (
      <Skeleton className="h-40 w-40 rounded-lg !bg-[var(--accent)]"/>
    );
  return (
    <div
      className={`rounded-lg shadow p-4 text-center ${getTypeGradient(
        pokemon.types[0]?.toLowerCase() || "default"
      )}`}
    >
      <h2 className="text-xl font-bold capitalize mb-2 drop-shadow">
        {pokemon.name}
      </h2>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="h-40 w-40 object-contain mx-auto"
      />
      <div className="flex justify-center gap-5 text-sm font-medium">
        {pokemon.types.map((t) => (
          <PokeTypeBadge type={t} key={t} />
        ))}
      </div>
    </div>
  );
}
