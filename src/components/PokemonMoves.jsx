import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { Input } from "./ui/input";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";

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
  const pageSize = 12;

  const moves = useMemo(() => {
    const raw = pokemon?.moves || [];
    return raw.filter((m) => m.includes(search.toLowerCase())).sort();
  }, [pokemon, search]);

  const totalPages = Math.ceil(moves.length / pageSize);
  const paginatedMoves = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return moves.slice(start, start + pageSize);
  }, [moves, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading)
    return <p className="text-center text-slate-400">Loading moves…</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Filter moves…"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="px-3 py-2 bg-slate-800 text-white placeholder-slate-500 rounded focus:ring-2 focus:ring-indigo-500"
      />

      <motion.ul
        className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-900 rounded-lg shadow-inner max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.03 } },
        }}
      >
        {paginatedMoves.map((move) => {
          const formatted = move.replace(/-/g, " ");
          const hue = getHue(move);
          return (
            <motion.li
              key={move}
              variants={fade}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 p-3 text-white text-sm font-semibold rounded-lg shadow-lg cursor-pointer overflow-hidden relative"
              style={{ backgroundColor: `hsl(${hue}, 60%, 40%)` }}
              title={formatted}
            >
              <Zap className="w-5 h-5 text-white/90" />
              <span className="truncate capitalize">{formatted}</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/50 animate-pulse" />
            </motion.li>
          );
        })}
      </motion.ul>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-slate-300 hover:text-white" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={
                `px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium ` +
                (currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white")
              }
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-slate-300 hover:text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
