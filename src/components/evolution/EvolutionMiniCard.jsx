import { useState } from "react";
import PokeDetailModal from "@/components/PokeDetailModal";
import pokemonColors from "@/utils/pokemonColors";
import { ArrowUpRight } from "lucide-react";
import CardImage from "./CardImage";
import CardOverlay from "./CardOverlay";

function EvolutionMiniCard({ poke, evolutionHint }) {
  const [open, setOpen] = useState(false);

  const name = poke.name;
  const img =
    poke.sprites?.other?.["official-artwork"]?.front_default ||
    poke.sprites?.front_default;
  const id = poke.id;
  const colorKey =
    poke.color?.name || poke.species?.color?.name || poke?.species?.color;
  const base = pokemonColors[colorKey] || pokemonColors.default;

  return (
    <>
      {open && (
        <PokeDetailModal
          pokemonName={name}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open ${name} details`}
        className="group relative w-36 xs:w-40 rounded-xl p-3 pb-4 flex flex-col items-center gap-1.5 overflow-hidden cursor-pointer border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/0 backdrop-blur-md shadow-[0_4px_18px_-6px_rgba(0,0,0,0.5)] transition focus:outline-none focus:ring-2 focus:ring-yellow-400/40 hover:-translate-y-1 hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)] hover:ring-2 hover:ring-yellow-400/30"
        style={{ backgroundColor: base + "CC" }}
      >
        <CardOverlay />
        <span className="absolute top-2 right-2 text-white/40 group-hover:text-white/80 transition">
          <ArrowUpRight size={16} />
        </span>
        <CardImage img={img} name={name} />
        <p className="capitalize font-bold text-sm tracking-wide text-white drop-shadow-sm">
          {name}
        </p>
        <span className="text-[11px] font-mono text-white/60">
          #{id.toString().padStart(4, "0")}
        </span>
        {evolutionHint && (
          <span className="mt-1 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
            {evolutionHint}
          </span>
        )}
      </button>
    </>
  );
}

export default EvolutionMiniCard;