import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import PokeCardDisplayer from "./PokeCardDisplayer";
import usePokemonList from "@/hooks/usePokemonList";
import { Loader2 } from "lucide-react";

function PokemonList() {
  const { pokemonList, loading, error } = usePokemonList();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const count = pokemonList ? Math.ceil(pokemonList.length / itemsPerPage) : 1;

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
      <PokeCardDisplayer
        page={page}
        itemsPerPage={itemsPerPage}
        pokemonList={pokemonList}
      />

      <div className="flex items-center justify-center gap-8">
        <Button
          variant="contained"
          color="inherit"
          startIcon={<ArrowBack />}
          onClick={handlePrevious}
          disabled={page <= 1}
          sx={{ borderRadius: "8px", textTransform: "none" }}
        >
          Précédent
        </Button>
        <Button
          variant="contained"
          color="inherit"
          endIcon={<ArrowForward />}
          onClick={handleNext}
          disabled={page >= count}
          sx={{ borderRadius: "8px", textTransform: "none" }}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}

export default PokemonList;
