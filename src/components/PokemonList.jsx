import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import usePokemonList from "@/hooks/usePokemonList";
import FloatingSearchBar from "./FloatingSearchBar";
import PokeCardDisplayer from "./PokeCardDisplayer";
import PaginationControls from "./ui/pagination";

function PokemonList() {
  const { pokemonList, loading, error } = usePokemonList();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 12;
  const count = pokemonList ? Math.ceil(pokemonList.length / itemsPerPage) : 1;

  useEffect(() => {
    const savedPage = localStorage.getItem("PokemonPage");
    if (savedPage) setPage(Number(savedPage));
  }, []);

  useEffect(() => {
    localStorage.setItem("PokemonPage", page);
  }, [page]);

  if (loading)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <Loader2 size={48} className="animate-spin" />
        <p>Please Wait ... </p>
      </div>
    );
  if (error) return <div className="text-red-500 text-center py-10">Error loading Pokémon data</div>;

  return (
    <div className="flex flex-col items-center gap-8">
      <FloatingSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm && (
        <h1 className="font-bold text-lg">
          Search result(s) for: <span className="text-md font-normal">{searchTerm}</span>
        </h1>
      )}
      <PokeCardDisplayer
        page={page}
        itemsPerPage={itemsPerPage}
        pokemonList={pokemonList}
        searchTerm={searchTerm}
      />
      <PaginationControls page={page} setPage={setPage} count={count} />
    </div>
  );
}

export default PokemonList;