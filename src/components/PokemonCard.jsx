import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import getTypeGradient from "@/utils/getTypeGradient";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import assets from "@/assets/assets";
import PokeTypeBadge from "./PokeTypeBadge";
import { Dot, Ruler } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import PokeDetailModal from "./PokeDetailModal";
import { FaBolt, FaDumbbell } from "react-icons/fa";
import { PokeStatBadge } from "@/components/PokeStatsBadge";

function PokemonCard({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (loading || !pokemon) return <PokemonCardSkeleton />;
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
        onClick={() => setIsOpenModal(true)}
        className="group [perspective:1500px] min-w-[292px] min-h-[410px] cursor-pointer"
      >
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* FRONT */}
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
                className="relative z-10 max-h-full object-contain transition-all ease-in-out duration-300 group-hover:scale-110"
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

          {/* BACK */}
          <div className="absolute inset-0 rounded-xl bg-gray-900 text-white overflow-hidden flex flex-col items-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div
              className={`pt-4 text-center h-20 w-full ${getTypeGradient(
                pokemon.types[0].toLowerCase()
              )}`}
            >
              <h2 className="text-xl font-bold mb-2 capitalize">
                - {pokemon.name} -
              </h2>
              <p className="text-sm mb-2">{pokemon.genus}</p>
            </div>
            <div className="h-32 justify-center items-center px-6 mt-4">
              <p className="text-base text-center">{pokemon.description}</p>
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
        </div>
      </button>
    </>
  );
}

export default PokemonCard;
