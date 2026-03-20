import useDarkTheme from "@/hooks/useDarkTheme";
import getTypeGradient from "@/utils/getTypeGradient";
import React from "react";
import { PokeStatBadge } from "../PokeStatsBadge";

function OwnedPokemonCardBack({ pokemon }) {
  const isDark = useDarkTheme();

  return (
    <div
      className={`absolute inset-0 rounded-xl ${
        isDark ? "bg-gray-900" : "bg-gray-100/80"
      } text-foreground overflow-hidden flex flex-col items-center [transform:rotateY(180deg)] [backface-visibility:hidden]`}
    >
      <div
        className={`pt-4 text-center h-20 w-full text-foreground ${getTypeGradient(
          "water"
        )}`}
      >
        <h2 className="text-xl text-foreground font-bold mb-2 capitalize">
          - {pokemon.name} -
        </h2>
        <p className="text-sm text-foreground font-semibold mb-2">
          {pokemon.genus}
        </p>
      </div>
      <div className="h-32 justify-center items-center px-6 mt-4">
        <p className=" text-center text-sm font-semibold">
          {pokemon.description}
        </p>
      </div>
      <div className="items-center bottom-0 flex flex-col">
        <div className="mb-5">
          <PokeStatBadge
            pokeStatData={[
              { name: "hp", value: pokemon.hp },
              { name: "attack", value: pokemon.attack },
              { name: "defense", value: pokemon.defense },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default OwnedPokemonCardBack;
