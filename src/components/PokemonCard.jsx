import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import getTypeGradient from "@/utils/getTypeGradient";
import { Link } from "react-router-dom";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import assets from "@/assets/assets";
import PokeTypeBadge from "./PokeTypeBadge";
import { Dot, Ruler } from "lucide-react";
import { Badge } from "./ui/badge";
import { FaBolt, FaDumbbell } from "react-icons/fa";
import { PokeStatBadge } from "@/components/PokeStatsBadge";

function PokemonCard({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);

  if (loading || !pokemon) return <PokemonCardSkeleton />;
  if (error) return <div className="text-red-500 text-center">Error</div>;

  return (
    <div className="group [perspective:1500px] min-w-[292px] min-h-[410px]">
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

          <h1 className="text-2xl font-extrabold capitalize text-white ">
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

          {/* Height & Weight */}
          <div className="flex justify-center gap-10 mt-2">
            {pokemon.height && (
              <div className="flex flex-col">
                <span className="text-gray-300 font-bold text-l">
                  {pokemon.height / 10} M
                </span>
                <span className="flex items-center gap-2 font-bold text-sm text-white">
                  <Ruler size={15} className="text-gray-300" />
                  Height
                </span>
              </div>
            )}
            {pokemon.weight && (
              <div className="flex flex-col">
                <span className="text-gray-300 font-bold text-l">
                  {pokemon.weight / 10} KG
                </span>
                <span className="flex items-center gap-2 font-bold text-sm text-white">
                  <FaDumbbell size={15} className="text-gray-300" />
                  Weight
                </span>
              </div>
            )}
          </div>

          <Badge className="absolute bottom-0 right-5 text-sm font-semibold text-white mb-3 bg-gradient-to-tr from-yellow-300 to-yellow-700 mt-5 px-3">
            #{pokemon.id}
          </Badge>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-xl bg-gray-900 text-white overflow-hidden flex flex-col items-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className={`pt-4 text-center h-20 w-[100%] bg- ${getTypeGradient(
            pokemon.types[0].toLowerCase()
          )}`}>
            <h2 className={`text-xl font-bold mb-2 justify-center align-center text-center capitalize `} >-{pokemon.name}-</h2>
            <p className="text-sm mb-5">{pokemon.genus}</p>
          </div>
          <div className="h-32 justify-center align-center items-center">
            <p className="text-base mb-2 text-center mx-8 mt-4">{pokemon.description}</p>
          </div>
          <div className="items-center bottom-0 flex flex-col">
            <div className="mb-5">
              <span>
                <PokeStatBadge pokeStatData={pokemon.stats} />
              </span>
            </div>
            <Link
              to={`pokemon/${pokemon.name}`}
              className={`flex position-fixed bottom-0 items-center gap-2 text-gray-950 px-4 py-2 rounded shadow font-semibold hover:bg-gray-600 transition-colors ${getTypeGradient(
                pokemon.types[0].toLowerCase()
              )}`}
            >
              <FaBolt size={16} />
              See more details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
