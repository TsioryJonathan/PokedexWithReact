import React from "react";
import { useParams } from "react-router-dom";
import GlobalDetail from "../components/GlobalDetail";

function PokemonDetail() {
  const { name } = useParams();
  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-screen w-[80%]">
      <GlobalDetail name={name} />
    </div>
  );
}

export default PokemonDetail;
