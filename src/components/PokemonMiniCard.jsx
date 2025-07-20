import getTypeGradient from "@/utils/getTypeGradient";
import PokeTypeBadge from "./PokeTypeBadge";
import { Skeleton } from "@mui/material";
import PokeImage from "./ui/pokeImage";
import StatComparison from "./StatComparison";
import { SummaryStats } from "./SummaryStats";

export default function PokemonMiniCard({ pokemon }) {
  if (!pokemon)
    return <Skeleton className="h-40 w-40 rounded-lg !bg-[var(--accent)]" />;
  return (
    <div
      className={`rounded-lg shadow p-4 text-center ${getTypeGradient(
        pokemon.types[0]?.toLowerCase() || "default"
      )}`}
    >
      <div className="flex gap-4">
        <div className="mt-4 w-[40%] flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold capitalize mb-2 drop-shadow">
            {pokemon.name}
          </h2>
          <PokeImage
            pokemon={pokemon}
            className="relative w-full h-[60%] aspect-[4/3] flex items-center justify-center rounded-lg overflow-hidden"
            imageClassName="relative z-10 w-full h-full object-contain"
            bgClassName="absolute inset-0 w-full h-full object-cover opacity-30 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          />
          <SummaryStats pokemon={pokemon}/>
          <div className="mt-4 flex justify-start items-start gap-5 text-sm font-medium">
            {pokemon.types.map((t) => (
              <PokeTypeBadge type={t} key={t} />
            ))}
          </div>
        </div>
        <StatComparison pokemon={pokemon} className="flex-1 h-1/2" />
      </div>
    </div>
  );
}
