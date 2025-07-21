import React, { useEffect, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import PokeCardDisplayer from "./PokeCardDisplayer";
import usePokemonList from "@/hooks/usePokemonList";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import SearchInput from "./SearchInput";
import PokedexLogo from "./PokedexLogo";
import PokeBallLogo from "./PokeBallLogo";

function PokemonList() {
  const { pokemonList, loading, error } = usePokemonList();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const count = pokemonList ? Math.ceil(pokemonList.length / itemsPerPage) : 1;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedPage = localStorage.getItem("PokemonPage");
    if (savedPage) {
      setPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("PokemonPage", page);
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (page < count) setPage((prev) => prev + 1);
  };

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <Loader2 size={48} className="animate-spin" />
        <p>Please Wait ... </p>
      </div>
    );
  if (error) return <div>Error loading Pokémon data</div>;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-5 items-center justify-center">
        <PokeBallLogo className={" w-20 h-20 object-cover"} />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <PokeCardDisplayer
        page={page}
        itemsPerPage={itemsPerPage}
        pokemonList={pokemonList}
        searchTerm={searchTerm}
      />

      <div className="w-4/5 flex items-center justify-between">
        <Button
          className=" text-white hover:bg-primary-dark bg-gray-800/50 text-text cursor-pointer"
          onClick={handlePrevious}
          disabled={page <= 1}
        >
          <ArrowBack />
          Previous
        </Button>
        <Button
          className=" text-white hover:bg-primary-dark bg-gray-800/50 text-text cursor-pointer"
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
