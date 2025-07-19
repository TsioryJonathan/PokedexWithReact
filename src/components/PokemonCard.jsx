import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import getTypeGradient from "@/utils/getTypeGradient";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import assets from "@/assets/assets";
import PokeTypeBadge from "./PokeTypeBadge";
import { Dot, Ruler } from "lucide-react";
import { Badge } from "./ui/badge";

import { FaDumbbell } from "react-icons/fa";
import { useState } from "react";
import PokeDetailModal from "./PokeDetailModal";

function PokemonCard({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (loading || !pokemon) {
    return <PokemonCardSkeleton />;
  }

  if (error) return <div className="text-red-500 text-center">Error</div>;

  return (
    <>
      {isOpenModal && (
        <PokeDetailModal
          pokemonName={pokemon.name}
          setIsOpen={setIsOpenModal}
        />
      )}
      <button
        key={pokemon.id}
        className={`min-w-[292px] min-h-[400px] cursor-pointer relative rounded-xl shadow-md px-5 pt-5 pb-15 text-center border-gray-300 h-fit group transition-transform duration-300 ease-in-out ${getTypeGradient(
          pokemon.types[0].toLowerCase()
        )} `}
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-lg overflow-hidden">
          {/* Background decorative image */}
          <img
            src={assets.bg}
            alt="Bg Pokeball"
            className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] "
          />
          {/* Pokemon image */}
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="relative z-10 max-h-full object-contain group-hover:scale-110 transition-all ease-in-out duration-300"
          />
        </div>

        {/* Text Info */}
        <h1 className="text-2xl font-extrabold capitalize text-white">
          <span className="flex items-center justify-center">
            <Dot size={64} />
            {pokemon.name}
            <Dot size={64} />
          </span>
        </h1>

        {/* Types */}
        <div className="flex justify-center gap-10 ">
          {pokemon.types.map((t) => (
            <PokeTypeBadge type={t} key={t} />
          ))}
        </div>

        {/* Height && Weight*/}
        <div className="flex justify-center gap-10 mt-3">
          {pokemon.height && (
            <div className="flex flex-col">
              <span className="text-gray-300 font-bold text-xl">
                {pokemon.height / 10} M
              </span>
              <span className="flex items-center gap-2 font-bold text-sm text-white">
                {" "}
                <Ruler size={18} className="text-gray-300 " />
                Height
              </span>
            </div>
          )}
          {pokemon.weight && (
            <div className="flex flex-col">
              <span className="text-gray-300 font-bold text-xl">
                {pokemon.weight / 10} KG
              </span>
              <span className="flex items-center gap-2 font-bold text-sm text-white">
                {" "}
                <FaDumbbell size={18} className="text-gray-300 " />
                Weight
              </span>
            </div>
          )}
        </div>

        {/* Id Badge */}
        <Badge className="absolute bottom-0 right-5 text-sm font-semibold text-white mb-3 bg-gradient-to-tl from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center px-3 border-none">
          #{pokemon.id}
        </Badge>
      </button>
    </>
  );
}

export default PokemonCard;
