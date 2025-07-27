import React, { useEffect, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import PokeCardDisplayer from "./PokeCardDisplayer";
import usePokemonList from "@/hooks/usePokemonList";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import SearchInput from "./SearchInput";
import PokeBallLogo from "./PokeBallLogo";

function PokemonList() {
  const { pokemonList, loading, error } = usePokemonList();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const count = pokemonList ? Math.ceil(pokemonList.length / itemsPerPage) : 1;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedPage = localStorage.getItem("PokemonPage");
    if (savedPage) setPage(Number(savedPage));
  }, []);

  useEffect(() => {
    localStorage.setItem("PokemonPage", page);
  }, [page]);

  const handlePrevious = () => page > 1 && setPage((prev) => prev - 1);
  const handleNext = () => page < count && setPage((prev) => prev + 1);

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <Loader2 size={48} className="animate-spin" />
        <p>Please Wait ... </p>
      </div>
    );
  if (error) return <div>Error loading Pokémon data</div>;

  // pagination window of max 10 pages
  const maxButtons = 10;
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = Math.min(count, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-5 items-center justify-center">
        <PokeBallLogo className="w-20 h-20 object-cover" />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <PokeCardDisplayer
        page={page}
        itemsPerPage={itemsPerPage}
        pokemonList={pokemonList}
        searchTerm={searchTerm}
      />

      {/* Pagination controls with limited numbered navigation */}
      <div className="w-4/5 flex items-center justify-around gap-2 flex-wrap">
        <Button
          className="text-white bg-gray-800/50 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={handlePrevious}
          disabled={page <= 1}
        >
          <ArrowBack />
          Previous
        </Button>

        <div className="flex gap-5 items-center justify-center">
          {pages.map((num) => (
            <Button
              key={num}
              className={`text-white px-3 py-2 rounded cursor-pointer hover:bg-gray-500 ${
                page === num ? "bg-amber-500" : "bg-gray-800/50"
              }`}
              onClick={() => setPage(num)}
            >
              {num.toString().padStart(2, "0")}
            </Button>
          ))}
        </div>

        <Button
          className="text-white bg-gray-800/50 hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={handleNext}
          disabled={page >= count}
        >
          Next
          <ArrowForward />
        </Button>
      </div>
    </div>
  );
}

export default PokemonList;
