// GlobalDetail.jsx
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import pokemonColors from "@/utils/pokemonColors";
import GlobalDetailSkeleton from "./GlobalDetailSkeleton";
import PokeTypeBadge from "./PokeTypeBadge";
import { Volume2 } from "lucide-react";
import CryButton from "./ui/cryButton";

function GlobalDetail({ name }) {
  const { pokemon, loading, error } = usePokemonDetails(name);

  if (loading) return <GlobalDetailSkeleton />;
  if (error || !pokemon) return <p className="text-red-500">Error loading.</p>;

  const base = pokemonColors[pokemon.color] || pokemonColors.default;

  return (
    <div className="relative flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `linear-gradient(135deg, ${base} 0%, #0f1115 100%)`,
        }}
      />
      <div className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />

      {/* Pokémon Image */}
      <div className="relative md:w-1/3 flex justify-center items-center">
        <div className="absolute h-56 w-56 bg-white/10 blur-3xl rounded-full" />
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative h-56 w-56 object-contain drop-shadow-[0_4px_25px_rgba(255,255,255,0.25)]"
          loading="lazy"
        />
        <span className="absolute -top-1 -left-1 text-xs font-semibold px-2 py-1 rounded-md bg-yellow-400/90 text-slate-900 shadow">
          #{pokemon.id}
        </span>
      </div>

      {/* Info */}
      <div className="relative md:w-2/3 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold capitalize tracking-tight flex flex-wrap gap-3 items-center text-white">
            {pokemon.name}
            <span className="flex gap-2">
              {pokemon.types.map((t) => (
                <PokeTypeBadge key={t} type={t} />
              ))}
            </span>
          </h1>
          <p className="text-sm uppercase tracking-wide text-white/50">
            {pokemon.genus}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-white/80 max-w-prose">
          {pokemon.description}
        </p>

        {pokemon.cries && <CryButton pokemon={pokemon} />}
      </div>
    </div>
  );
}

export default GlobalDetail;
