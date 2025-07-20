import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import getTypeAccent from "@/utils/getTypeAccent";
import PokeTypeBadge from "@/components/PokeTypeBadge";
import { motion } from "framer-motion";

function HeroSlide({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);

  if (loading || !pokemon) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-slate-400">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 text-center">Error loading Pokémon</div>
    );
  }

  const primaryType = pokemon.types[0];
  const accent = getTypeAccent(primaryType);
  const previewStats = pokemon.stats.slice(0, 3);

  return (
    <motion.div
      key={pokemon.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative flex flex-col-reverse md:flex-row items-center md:items-stretch justify-between gap-10"
    >
      <div
        className={`relative w-full md:w-1/2 rounded-2xl px-8 py-10 
                    backdrop-blur-md bg-white/5 ring-1 ring-white/10 
                    border border-white/10 overflow-hidden  `}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.grad} opacity-40`}
        />

        <h1 className="relative text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow">
          Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500">
            Pokédex
          </span>
        </h1>

        <p className="relative mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
          Discover deep data, origins and power details for every Pokémon.
          Browse species, compare stats and explore evolution paths.
        </p>

        <div className="relative mt-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white capitalize tracking-wide">
            {pokemon.name}
          </h2>

          <p className="text-slate-300/90 text-sm leading-relaxed line-clamp-4 max-w-md">
            {pokemon.description}
          </p>

          {/* Types */}
          <div className="flex flex-wrap gap-2 pt-2">
            {pokemon.types.map((t) => (
              <PokeTypeBadge key={t} type={t} />
            ))}
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            {previewStats.map((s) => {
              const percent = Math.min((s.value / 255) * 100, 100);
              return (
                <div key={s.name} className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wide text-slate-400">
                    {s.name.replace("-", " ")}
                  </span>
                  <div className="h-2 w-full bg-slate-800/50 rounded overflow-hidden">
                    <div
                      className={`h-full ${accent.bar} transition-all duration-700`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono mt-1">
                    {s.value}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            className="group relative mt-6 inline-flex items-center gap-2 px-5 py-2
                       rounded-lg bg-gradient-to-r from-amber-400 to-amber-600
                       text-slate-900 font-semibold shadow hover:brightness-110
                       transition focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          >
            Explore more
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Bloc image */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center">
        <div className="absolute -inset-10 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-white/10 to-transparent" />

        <div className="absolute w-72 h-72 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm rotate-12" />
        {/* Pokémon */}
        <motion.img
          src={pokemon.image}
          alt={pokemon.name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "anticipate" }}
          className="relative w-72 h-72 md:w-80 md:h-80 object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
          draggable="false"
        />
        {/* Accent orb */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 0.4, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`absolute top-6 right-10 h-16 w-16 rounded-full bg-gradient-to-br ${accent.grad} blur-md`}
        />
      </div>
    </motion.div>
  );
}

export default HeroSlide;
