import { useState } from "react";
import useDarkTheme from "@/hooks/useDarkTheme";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import getTypeAccent from "@/utils/getTypeAccent";
import { Loader2 } from "lucide-react";
import Portal from "./Portal";
import PokeDetailModal from "./PokeDetailModal";
import PokemonImageTilt from "./heroSlide/PokemonImageTilt";
import PokemonInfo from "./globalDetail/PokemonInfo";
import StatusBadge from "./globalDetail/StatusBadge";
import TrendingBadge from "./TrendingBadge";
import CryButton from "./ui/CryButton";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

function HeroSlide({ pokemonName }) {
  const isDark = useDarkTheme();
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const [isOpen, setIsOpen] = useState(false);

  if (loading || !pokemon)
    return (
      <div className="flex items-center justify-center h-[50vh] text-slate-400 text-sm">
        <Loader2 className="w-10 h-10 animate-spin mr-2" />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-10">Error</div>;

  const type = pokemon.types[0];
  const accent = getTypeAccent(type);
  const description =
    pokemon.description.length > 95
      ? pokemon.description.slice(0, 92) + "…"
      : pokemon.description;

  return (
    <>
      {isOpen && (
        <Portal>
          <PokeDetailModal
            pokemonName={pokemonName}
            open={isOpen}
            setIsOpen={setIsOpen}
            onClose={() => setIsOpen(false)}
          />
        </Portal>
      )}
      <div className="relative w-full px-1">
        <div className="opacity-0 md:opacity-100 absolute top-5 left-5 z-10">
          <CryButton pokemon={pokemon} />
        </div>
        <StatusBadge isLegendary={pokemon.is_legendary} isMythical={pokemon.is_mythical} />
        <TrendingBadge rotate={0} className="absolute top-[80%] right-0 left-[75%]" />
        <div
          className={`relative grid md:grid-cols-2 gap-10 items-center ${
            isDark ? "bg-slate-900/55 border-white/10" : "bg-white/80 border-black/10"
          } backdrop-blur-xl border rounded-2xl p-7 md:p-9 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] overflow-hidden`}
        >
          <div className={`pointer-events-none absolute inset-0 opacity-30 bg-gradient-to-br ${accent.grad}`} />
          <PokemonImageTilt pokemon={pokemon} isDark={isDark} fade={fade} accent={accent} />
          <PokemonInfo
            pokemon={pokemon}
            isDark={isDark}
            description={description}
            fade={fade}
            showStats={true}
            showCta={true}
            setIsOpen={setIsOpen}
            cryButton={false}
          />
        </div>
      </div>
    </>
  );
}

export default HeroSlide;