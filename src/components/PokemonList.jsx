import React, { useState } from "react";
import { Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import PokeCardDisplayer from "./PokeCardDisplayer";
import usePokemonList from "@/hooks/usePokemonList";

function PokemonList() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const { pokemonList, loading, error } = usePokemonList();

  const count = pokemonList ? Math.ceil(pokemonList.length / itemsPerPage) : 1;

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < count) setPage((prev) => prev + 1);
  };

  if (loading) return <div>Loading...</div>;
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

        <span className="text-lg px-2 py-1 rounded-lg shadow-md shadow-shadow bg-gray-300 mx-4">Page {page}</span>

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