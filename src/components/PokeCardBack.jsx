import getTypeGradient from "@/utils/getTypeGradient";
import React from "react";
import { FaBolt } from "react-icons/fa";
import { PokeStatBadge } from "./PokeStatsBadge";

function PokeCardBack({ pokemon }) {
  return (
    <div className="absolute inset-0 rounded-xl bg-gray-900 text-white overflow-hidden flex flex-col items-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
      <div
        className={`pt-4 text-center h-20 w-full text-white ${getTypeGradient(
          pokemon.types[0].toLowerCase()
        )}`}
      >
        <h2 className="text-xl font-bold mb-2 capitalize">
          - {pokemon.name} -
        </h2>
        <p className="text-sm mb-2">{pokemon.genus}</p>
      </div>
      <div className="h-32 justify-center items-center px-6 mt-4">
        <p className=" text-center text-sm">{pokemon.description}</p>
      </div>
      <div className="items-center bottom-0 flex flex-col">
        <div className="mb-5">
          <PokeStatBadge pokeStatData={pokemon.stats} />
        </div>
        <div
          className={`flex items-center gap-2 text-gray-950 px-4 py-2 rounded shadow font-semibold hover:bg-gray-600 transition-colors ${getTypeGradient(
            pokemon.types[0].toLowerCase()
          )}`}
        >
          <FaBolt size={16} />
          See more
        </div>
      </div>
    </div>
  );
}

export default PokeCardBack;
