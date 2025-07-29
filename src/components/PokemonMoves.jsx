// src/components/PokemonMoves.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { Input } from "./ui/input";
import { Zap, ChevronLeft, ChevronRight, Search, Info } from "lucide-react";
import MoveDetailsModal from "./MoveDetailsModal";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const getHue = (str) =>
  str.split("").reduce((h, c) => h + c.charCodeAt(0), 0) % 360;

export default function PokemonMoves({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMove, setSelectedMove] = useState(null);
  const pageSize = 12;

  const moves = useMemo(() => {
    const raw = pokemon?.moves || [];
    return raw.filter((m) => m.name.includes(search.toLowerCase())).sort();
  }, [pokemon, search]);

  const totalPages = Math.ceil(moves.length / pageSize);
  const paginatedMoves = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return moves.slice(start, start + pageSize);
  }, [moves, currentPage]);

  if (loading)
    return <p className="text-center text-slate-400">Loading moves…</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const goToPage = (n) => {
    if (n < 1 || n > totalPages) return;
    setCurrentPage(n);
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900  shadow-2xl">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          size={18}
        />
        <Input
          type="text"
          placeholder="Filter moves…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10 pr-4 py-3 bg-slate-700 text-white placeholder-slate-400 rounded-full border border-slate-600 focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <motion.ul
        className="grid grid-cols-2 md:grid-cols-3 gap-5 p-4 bg-slate-800 rounded-2xl shadow-inner max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.03 } },
        }}
      >
        {paginatedMoves.map((move) => {
          const formatted = move.name.replace(/-/g, " ");
          const hue = getHue(move.name);
          return (
            <motion.li
              key={move.name}
              variants={fade}
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden flex items-center justify-between gap-2 px-4 py-3 text-white text-sm font-semibold rounded-xl border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)] cursor-pointer"
              style={{
                background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${
                  (hue + 40) % 360
                }, 70%, 50%))`,
              }}
              title={formatted}
              onClick={() => setSelectedMove(move.name)}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="truncate capitalize tracking-wide text-sm">
                  {formatted}
                </span>
              </div>
              <Info className="w-4 h-4 text-white/80 group-hover:text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white/70 animate-pulse" />
            </motion.li>
          );
        })}
      </motion.ul>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-slate-300 hover:text-white" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-slate-300 hover:text-white" />
          </button>
        </div>
      )}
      <MoveDetailsModal
        moveName={selectedMove}
        open={!!selectedMove}
        onClose={() => setSelectedMove(null)}
      />
    </div>
  );
}
