import { useState } from "react";
import PokeDetailModal from "@/components/PokeDetailModal";
import pokemonColors from "@/utils/pokemonColors";
import { ArrowUpRight } from "lucide-react";

export default function EvolutionMiniCard({ poke, evolutionHint }) {
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
      {open && <PokeDetailModal pokemonName={name} setIsOpen={setOpen} />}

      <button
        onClick={() => setOpen(true)}
        aria-label={`Open ${name} details`}
        className={`
          group relative w-36 xs:w-40
          rounded-2xl p-3 pb-4 flex flex-col items-center gap-1.5
          overflow-hidden cursor-pointer
          border border-white/15
          bg-gradient-to-br from-white/10 via-white/5 to-white/0
          backdrop-blur-md
          shadow-[0_4px_18px_-6px_rgba(0,0,0,0.5)]
          transition
          focus:outline-none focus:ring-2 focus:ring-yellow-400/40
          hover:-translate-y-1 hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)]
        `}
        style={{
          backgroundColor: base + "CC",
        }}
      >
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                     bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25),transparent_60%)]
                     mix-blend-overlay"
        />

        <span className="pointer-events-none absolute -right-8 -top-8 w-24 h-24 rounded-full border border-white/15 opacity-30 group-hover:opacity-60 transition" />
        <span className="pointer-events-none absolute -left-10 bottom-0 w-28 h-28 rounded-full border border-white/10 opacity-20 group-hover:opacity-40 transition" />

        <span className="absolute top-2 right-2 text-white/40 group-hover:text-white/80 transition">
          <ArrowUpRight size={16} />
        </span>

        <div className="relative w-24 h-24 flex items-center justify-center">
          <img
            src={img}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]
                       transition-transform duration-400 group-hover:scale-110"
          />

          <span
            className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-60
                       bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_70%)]
                       transition"
          />
        </div>

        <p className="capitalize font-semibold text-sm tracking-wide text-white drop-shadow-sm">
          {name}
        </p>

        <span className="text-[10px] font-mono text-white/55">
          #{id.toString().padStart(4, "0")}
        </span>

        {evolutionHint && (
          <span className="mt-1 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
            {evolutionHint}
          </span>
        )}

        <span
          className="pointer-events-none absolute inset-0 rounded-2xl ring-0
                     group-hover:ring-2 ring-yellow-400/30 transition"
        />
      </button>
    </>
  );
}
