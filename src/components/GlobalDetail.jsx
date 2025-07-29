import React from "react";
import { motion } from "framer-motion";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import pokemonColors from "@/utils/pokemonColors";
import GlobalDetailSkeleton from "./GlobalDetailSkeleton";
import PokeTypeBadge from "@/components/PokeTypeBadge";
import CryButton from "./ui/CryButton";
import { Crown, Star, Heart, Share2 } from "lucide-react";
import useIsDarkTheme from "@/hooks/useIsDarkTheme";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

export default function GlobalDetail({ name }) {
  const isDark = useIsDarkTheme();
  const { pokemon, loading, error } = usePokemonDetails(name);
  if (loading) return <GlobalDetailSkeleton />;
  if (error || !pokemon)
    return <p className="text-red-500 text-center py-4">Error loading.</p>;

  const baseColor = pokemonColors[pokemon.color] || pokemonColors.default;
  const isLegendary = pokemon.is_legendary;
  const isMythical = pokemon.is_mythical;

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl border ${isDark ? "border-white/10" : "border-black/10"} bg-opacity-10 overflow-hidden`}
      style={{ backgroundColor: baseColor }}
      {...fadeIn(0)}
    >
      {/* Overlay gradient */}
      <div className={`absolute inset-0 mix-blend-overlay rounded-2xl ${isDark ? "bg-gradient-to-br from-black/10 to-white/90" : "bg-gradient-to-br from-white to-white/10"}`} />

      {/* Legendary/Mythical badge */}
      {(isLegendary || isMythical) && (
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full shadow-lg bg-gradient-to-br from-amber-400 to-yellow-200/40"
          {...fadeIn(0.3)}
        >
          {isLegendary ? (
            <Crown className={`w-5 h-5 ${isDark ? "text-yellow-300" : "text-yellow-700"} animate-pulse`} />
          ) : (
            <Star className={`w-5 h-5 ${isDark ? "text-pink-300" : "text-pink-700"} animate-pulse`} />
          )}
          <span className="text-xs font-bold uppercase text-foreground tracking-wider">
            {isLegendary ? "Legendary" : "Mythical"}
          </span>
        </motion.div>
      )}

      {/* Pokémon Image */}
      <motion.div
        className="relative md:w-1/3 flex justify-center items-center"
        {...fadeIn(0.2)}
      >
        <div className={`absolute h-60 w-60 ${isDark ? "bg-white/20" : "bg-black/20"} blur-2xl rounded-full`} />
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative h-60 w-60 object-contain drop-shadow-lg"
          loading="lazy"
        />
        <span className={`absolute -top-2 -left-2 text-sm font-bold px-2 py-1 rounded-md ${isDark ? "bg-white/90 text-slate-900" : "bg-black/90 text-white"}`}>
          #{String(pokemon.id).padStart(3, "0")}
        </span>
      </motion.div>

      {/* Info section */}
      <div className="relative md:w-2/3 flex flex-col gap-4">
        <motion.div {...fadeIn(0.4)}>
          <h1 className="text-4xl font-extrabold capitalize tracking-tight text-foreground flex items-center gap-3">
            {pokemon.name}
            <div className="flex gap-2">
              {pokemon.types.map((t) => (
                <PokeTypeBadge key={t} type={t} />
              ))}
            </div>
          </h1>
          <p className={`text-sm uppercase tracking-wide ${isDark ? "text-white/60" : "text-black/60"}`}>
            {pokemon.genus}
          </p>
        </motion.div>

        <motion.p
          className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-black/80"} max-w-prose`}
          {...fadeIn(0.5)}
        >
          {pokemon.description}
        </motion.p>

        <motion.div className="flex items-center gap-4 mt-4" {...fadeIn(0.6)}>
          {pokemon.cries && <CryButton pokemon={pokemon} />}
        </motion.div>
      </div>
    </motion.div>
  );
}
