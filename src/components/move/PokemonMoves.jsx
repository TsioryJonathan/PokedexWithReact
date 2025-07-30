import { useState, useMemo } from "react";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import MoveList from "./MoveList";
import Pagination from "./Pagination";
import MoveDetailsModal from "../MoveDetailsModal";

function PokemonMoves({ pokemonName }) {
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

  if (loading) return <p className="text-center text-slate-400">Loading…</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
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
      <MoveList moves={paginatedMoves} onMoveClick={setSelectedMove} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(n) => setCurrentPage(n)}
        />
      )}
      <MoveDetailsModal
        moveName={selectedMove}
        open={!!selectedMove}
        onClose={() => setSelectedMove(null)}
      />
    </div>
  );
}

export default PokemonMoves;