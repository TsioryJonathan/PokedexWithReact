import React from "react";
import { FaDumbbell } from "react-icons/fa";
import { Dot, Ruler } from "lucide-react";
import PokeImage from "../ui/pokeImage";
import { Badge } from "../ui/badge";
import PokeTypeBadge from "../PokeTypeBadge";

function OwnedPokemonCardFront({ pokemon }) {
  return (
    <div
      className="rounded-xl shadow-md px-5 pt-5 pb-15 text-center
    bg-gradient-to-tr from-blue-900/80 to-blue-500/80
    text-black [backface-visibility:hidden]"
    >
      <PokeImage
        pokemon={pokemon}
        className="relative w-full aspect-[4/3] flex items-center justify-center rounded-lg overflow-hidden"
        imageClassName="relative max-h-full object-contain transition-all ease-in-out duration-300 group-hover:scale-110"
        bgClassName="absolute inset-0 w-full h-full object-cover opacity-30 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
      />

      <h1 className="text-2xl font-extrabold capitalize text-white">
        <span className="flex items-center justify-center">
          <Dot size={64} />
          {pokemon.name}
          <Dot size={64} />
        </span>
      </h1>

      <div className="flex justify-center gap-10 text-sm font-medium">
        <PokeTypeBadge type={pokemon.type} />
      </div>

      <div className="flex justify-center gap-10 mt-2">
        <div className="flex flex-col">
          <span className="text-white font-bold text-l">
            {pokemon.height / 10} M
          </span>
          <span className="flex items-center gap-2 font-bold text-sm text-white">
            <Ruler size={15} className="text-white" />
            Height
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-l">
            {pokemon.weight / 10} KG
          </span>
          <span className="flex items-center gap-2 font-bold text-sm text-white">
            <FaDumbbell size={15} className="text-white" />
            Weight
          </span>
        </div>
      </div>

      <Badge className="absolute bottom-0 right-5 text-sm font-semibold text-white mb-3 bg-gradient-to-tr from-yellow-300 to-yellow-700 mt-5 px-3">
        #{pokemon.id}
      </Badge>
    </div>
  );
}

export default OwnedPokemonCardFront;
