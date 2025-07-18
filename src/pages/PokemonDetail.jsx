import React from "react";
import { useParams } from "react-router-dom";
import PokemonDetails from "../components/PokemonDetails";

function PokemonDetail() {
  const params = useParams();
  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-screen bg-gray-100 w-[80%]">
      <PokemonDetails name={params.name} />
    </div>
  );
}

export default PokemonDetail;
