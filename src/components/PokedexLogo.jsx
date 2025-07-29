import assets from "@/assets/assets";
import React from "react";

function PokedexLogo({ className }) {
  return <img src={assets.pokedexLight} className={className} />;
}

export default PokedexLogo;
