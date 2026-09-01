import { motion } from "framer-motion";
import pokemonColors from "@/utils/pokemonColors";
import useDarkTheme from "@/hooks/useDarkTheme";
import GlobalDetailSkeleton from "../GlobalDetailSkeleton";
import PokemonInfo from "./PokemonInfo";
import PokemonImage from "./PokemonImage";
import StatusBadge from "./StatusBadge";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

function GlobalDetail({ pokemon, loading, error }) {
  const isDark = useDarkTheme();

  if (loading) return <GlobalDetailSkeleton />;
  if (error || !pokemon)
    return <p className="text-red-500 text-center py-4">Error loading.</p>;

  const baseColor = pokemonColors[pokemon.color] || pokemonColors.default;

  return (
    <motion.div
      className="relative flex flex-col md:flex-row gap-6 px-6 py-2 md:p-8 rounded-2xl"
      style={{ backgroundColor: baseColor }}
    >
      <div
        className={`absolute inset-0 mix-blend-overlay rounded-2xl ${
          isDark ? "bg-gradient-to-br from-black/10 to-white/90" : "bg-gradient-to-br from-white to-white/10"
        }`}
      />
      <StatusBadge
        isLegendary={pokemon.is_legendary}
        isMythical={pokemon.is_mythical}
        isDark={isDark}
        fade={fadeIn}
        showIcon={true}
      />
      <PokemonImage pokemon={pokemon} isDark={isDark} fadeIn={fadeIn} />
      <PokemonInfo
        pokemon={pokemon}
        isDark={isDark}
        fade={fadeIn}
        showGenus={true}
      />
    </motion.div>
  );
}

export default GlobalDetail;