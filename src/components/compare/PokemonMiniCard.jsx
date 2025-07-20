import getTypeGradient from "@/utils/getTypeGradient";
import PokeTypeBadge from "../PokeTypeBadge";
import PokeImage from "../ui/pokeImage";
import StatComparison from "./StatComparison";
import { SummaryStats } from "../SummaryStats";
import { MiniCardSkeleton } from "./MiniCardSkeleton";
import WinnerBadge from "./WinnerBadge";

export default function PokemonMiniCard({ pokemon, className, isWinner }) {
  if (!pokemon) return <MiniCardSkeleton />;
  return (
    <div
      className={`relative rounded-lg shadow p-4 pt-6 text-center overflow-visible ${className} ${getTypeGradient(
        pokemon.types[0]?.toLowerCase() || "default"
      )}`}
    >
      {isWinner && <WinnerBadge />}
      <div className="flex gap-4">
        <div className="mt-4 w-[40%] flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold capitalize mb-2 drop-shadow text-white">
            {pokemon.name}
          </h2>
          <PokeImage
            pokemon={pokemon}
            className="relative w-full h-[60%] aspect-[4/3] flex items-center justify-center rounded-lg overflow-hidden"
            imageClassName="relative z-10 w-full h-full object-contain"
            bgClassName="absolute inset-0 w-full h-full object-cover opacity-30 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          />
          <SummaryStats pokemon={pokemon} />
          <div className="mt-4 flex justify-start items-start gap-2 text-sm font-medium">
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
