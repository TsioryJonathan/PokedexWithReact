import assets from "@/assets/assets";
import React from "react";
import { FaDumbbell } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { Dot, Ruler } from "lucide-react";
import PokeTypeBadge from "./PokeTypeBadge";
import getTypeGradient from "@/utils/getTypeGradient";

function PokeCardFront({ pokemon }) {
  return (
    <div
      className={`absolute inset-0 rounded-xl shadow-md px-5 pt-5 pb-15 text-center ${getTypeGradient(
        pokemon.types[0].toLowerCase()
      )} [backface-visibility:hidden]`}
    >
      <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-lg overflow-hidden">
        <img
          src={assets.bg}
          alt="Bg Pokeball"
          className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
        />
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative z-10 w-[150px] h-[150px] object-contain transition-all ease-in-out duration-300 group-hover:scale-110"
        />
      </div>

      <h1 className="text-2xl font-extrabold capitalize text-white">
        <span className="flex items-center justify-center">
          <Dot size={64} />
          {pokemon.name}
          <Dot size={64} />
        </span>
      </h1>

      <div className="flex justify-center gap-10 text-sm font-medium">
        {pokemon.types.map((t) => (
          <PokeTypeBadge type={t} key={t} />
        ))}
      </div>

      <div className="flex justify-center gap-10 mt-2">
        <div className="flex flex-col">
          <span className="text-gray-300 font-bold text-l">
            {pokemon.height / 10} M
          </span>
          <span className="flex items-center gap-2 font-bold text-sm text-white">
            <Ruler size={15} className="text-gray-300" />
            Height
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-300 font-bold text-l">
            {pokemon.weight / 10} KG
          </span>
          <span className="flex items-center gap-2 font-bold text-sm text-white">
            <FaDumbbell size={15} className="text-gray-300" />
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

export default PokeCardFront;
