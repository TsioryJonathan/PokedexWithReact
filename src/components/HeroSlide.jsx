import { useRef, useState } from "react";
import useDarkTheme from "@/hooks/useDarkTheme";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import getTypeAccent from "@/utils/getTypeAccent";
import PokeTypeBadge from "@/components/PokeTypeBadge";
import StatCircle from "./StatCircle";
import TrendingBadge from "./TrendingBadge";
import { Button } from "./ui/button";
import PokeDetailModal from "./PokeDetailModal";
import Portal from "./Portal";
import { ArrowRight, Loader2 } from "lucide-react";
import CryButton from "./ui/CryButton";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

export default function HeroSlide({ pokemonName }) {
  const isDark = useDarkTheme();
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const [isOpen, setIsOpen] = useState(false);

  // tilt
  const ref = useRef(null);
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const rX = useTransform(mvy, [-55, 55], [12, -12]);
  const rY = useTransform(mvx, [-55, 55], [-12, 12]);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mvx.set(e.clientX - (r.left + r.width / 2));
    mvy.set(e.clientY - (r.top + r.height / 2));
  };
  const onLeave = () => {
    mvx.set(0);
    mvy.set(0);
  };

  if (loading || !pokemon) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-slate-400 text-sm">
        <Loader2 className="w-10 h-10 animate-spin mr-2" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center py-10">Error</div>;
  }

  const type = pokemon.types[0];
  const accent = getTypeAccent(type);
  const description =
    pokemon.description.length > 95
      ? pokemon.description.slice(0, 92) + "…"
      : pokemon.description;
  const ringStats = pokemon.stats.filter((s) =>
    ["hp", "attack", "defense"].includes(s.name.toLowerCase())
  );

  const isLegendary = pokemon.is_legendary;
  const isMythical = pokemon.is_mythical;

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <Portal>
          <PokeDetailModal
            pokemonName={pokemonName}
            open={isOpen}
            setIsOpen={setIsOpen}
            onClose={handleClose}
          />
        </Portal>
      )}
      <div className="relative w-full px-1">
        <div className="opacity-0 md:opacity-100 absolute top-5 left-5 z-10">
          <CryButton pokemon={pokemon} />
        </div>
        {(isLegendary || isMythical) && (
          <div
            className={
              `absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold uppercase z-10 ` +
              (isLegendary
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900"
                : "bg-gradient-to-r from-pink-400 to-pink-600 text-white")
            }
          >
            {isLegendary ? "Legendary" : "Mythical"}
          </div>
        )}
        {/* Trending badge */}
        <TrendingBadge
          rotate={0}
          className="absolute top-[80%] right-0 left-[75%]"
        />

        <div
          className={`
            relative grid md:grid-cols-2 gap-10 items-center
            ${
              isDark
                ? "bg-slate-900/55 border-white/10"
                : "bg-white/80 border-black/10"
            }
            backdrop-blur-xl border rounded-2xl p-7 md:p-9 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)]
            overflow-hidden
          `}
        >
          <div
            className={`pointer-events-none absolute inset-0 opacity-30 bg-gradient-to-br ${accent.grad}`}
          />

          <motion.div
            {...fade(0.05)}
            className="relative flex items-center justify-center order-1 md:order-none"
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: rX, rotateY: rY }}
          >
            <div
              className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br ${accent.grad} opacity-25 blur-2xl`}
            />
            <div
              className={`absolute w-56 h-56 md:w-72 md:h-72 rounded-full ${
                isDark
                  ? "bg-slate-950/50 border-white/10"
                  : "bg-black/10 border-black/20"
              }`}
            />
            <motion.img
              src={pokemon.image}
              alt={pokemon.name}
              draggable="false"
              className="relative w-56 h-56 md:w-72 md:h-72 object-contain select-none drop-shadow-[0_10px_32px_rgba(0,0,0,0.55)]"
              whileHover={{ scale: 1.045 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            />
            <div
              className={`absolute top-2 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-500/50 ${
                isDark ? " text-white/70" : " border-black/15 text-black/70"
              } backdrop-blur`}
            >
              #{pokemon.id.toString().padStart(4, "0")}
            </div>
          </motion.div>

          <motion.div {...fade(0.12)} className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="capitalize text-4xl font-extrabold tracking-tight text-foreground">
                {pokemon.name}
              </h2>
              <div className="flex gap-2">
                {pokemon.types.map((t) => (
                  <PokeTypeBadge key={t} type={t} />
                ))}
              </div>
            </div>

            <p
              className={`text-sm font-semibold leading-relaxed max-w-md ${
                isDark ? "text-slate-300/90" : "text-black/70"
              }`}
            >
              {description}
            </p>

            <div className="flex gap-6">
              {ringStats.map((s) => (
                <StatCircle key={s.name} value={s.value} label={s.name} />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                className={`group inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 brightness-100 shadow hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-sm cursor-pointer ${
                  isDark ? "text-slate-900" : "text-black"
                }`}
                onClick={() => setIsOpen(true)}
              >
                View Profile
                <span className="transition-transform group-hover:translate-x-1 text-base">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
