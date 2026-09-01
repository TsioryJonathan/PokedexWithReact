import { useEffect, useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import usePokemonList from "@/hooks/usePokemonList";
import FloatingSearchBar from "./FloatingSearchBar";
import PokeCardDisplayer from "./PokeCardDisplayer";
import PaginationControls from "./ui/pagination";

function PokemonList() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const itemsPerPage = 12;

  const { pokemonList, totalCount, loading, error, allNames, namesLoading, loadAllNames } =
    usePokemonList({ page, itemsPerPage });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    const savedPage = localStorage.getItem("PokemonPage");
    if (savedPage) setPage(Number(savedPage));
  }, []);

  useEffect(() => {
    localStorage.setItem("PokemonPage", page);
  }, [page]);

  const filteredSearch = useMemo(() => {
    if (!searchResults || !searchTerm) return null;
    return searchResults.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchResults, searchTerm]);

  const searchTotalPages = filteredSearch
    ? Math.ceil(filteredSearch.length / itemsPerPage)
    : 0;

  const paginatedSearch = useMemo(() => {
    if (!filteredSearch) return null;
    const start = (page - 1) * itemsPerPage;
    return filteredSearch.slice(start, start + itemsPerPage);
  }, [filteredSearch, page]);

  useEffect(() => {
    if (searchTerm && !searchTerm.includes(" ") && searchTerm.length > 0) {
      loadAllNames().then((names) => {
        setSearchResults(names);
      });
    }
    if (!searchTerm) {
      setSearchResults(null);
      setPage(1);
    }
  }, [searchTerm, loadAllNames]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  if (loading && page === 1 && !searchTerm)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <Loader2 size={48} className="animate-spin" />
        <p>Please Wait ... </p>
      </div>
    );
  if (error) return <div className="text-red-500 text-center py-10">Error loading Pokémon data</div>;

  const activeTotalPages = filteredSearch ? searchTotalPages : totalPages;

  return (
    <div className="flex flex-col items-center gap-8">
      <FloatingSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm && (
        <h1 className="font-bold text-lg">
          Search result(s) for: <span className="text-md font-normal">{searchTerm}</span>
        </h1>
      )}
      {namesLoading && searchTerm && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          Searching...
        </div>
      )}
      <PokeCardDisplayer
        page={page}
        itemsPerPage={itemsPerPage}
        pokemonList={filteredSearch || pokemonList}
        loading={loading || namesLoading}
      />
      {activeTotalPages > 1 && (
        <PaginationControls
          page={page}
          setPage={setPage}
          count={activeTotalPages}
        />
      )}
    </div>
  );
}

export default PokemonList;