import { motion } from "framer-motion";
import PokeTypeBadge from "@/components/PokeTypeBadge";
import StatCircle from "../StatCircle";
import CryButton from "../ui/CryButton";
import { ArrowRight } from "lucide-react";

function PokemonInfo({ pokemon, isDark, description, fade, showGenus = false, showStats = false, showCta = false, setIsOpen, cryButton = true }) {
  const ringStats = showStats
    ? pokemon.stats.filter((s) => ["hp", "attack", "defense"].includes(s.name.toLowerCase()))
    : [];
  return (
    <motion.div {...fade(showStats ? 0.12 : 0.4)} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className={`capitalize text-4xl font-extrabold tracking-tight text-foreground ${showGenus ? 'text-4xl' : 'text-3xl'}`}>
          {pokemon.name}
          <div className="flex gap-2">
            {pokemon.types.map((t) => (
              <PokeTypeBadge key={t} type={t} />
            ))}
          </div>
        </h2>
        {showGenus && (
          <p className={`text-sm uppercase tracking-wide ${isDark ? "text-white/60" : "text-white"}`}>
            {pokemon.genus}
          </p>
        )}
      </div>
      <motion.p
        className={`text-sm leading-relaxed ${isDark ? "text-slate-300/90" : "text-black/70"} max-w-md`}
        {...fade(showStats ? 0.12 : 0.5)}
      >
        {description || pokemon.description}
      </motion.p>
      {showStats && (
        <div className="flex gap-6">
          {ringStats.map((s) => (
            <StatCircle key={s.name} value={s.value} label={s.name} />
          ))}
        </div>
      )}
      <motion.div className="flex items-center gap-4" {...fade(showStats ? 0.12 : 0.6)}>
        {pokemon.cries && cryButton && <CryButton pokemon={pokemon} />}
        {showCta && (
          <button
            className={`group inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 brightness-100 shadow hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-sm cursor-pointer ${
              isDark ? "text-slate-900" : "text-black"
            }`}
            onClick={() => setIsOpen && setIsOpen(true)}
          >
            View Profile
            <span className="transition-transform group-hover:translate-x-1 text-base">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default PokemonInfo;