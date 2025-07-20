import usePokemonEvolutionDetails from "@/hooks/usePokemonEvolutionDetails";
import useEvolutionChainDetails from "@/hooks/useEvolutionChainDetails";

import pokemonColors from "@/utils/pokemonColors";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { FaArrowRight } from "react-icons/fa";
import EvolutionChainSkeleton from "./EvolutionChainSkeleton";

function EvolutionChain({ pokemonName }) {
  const { evolutionChain, loading, error } =
    usePokemonEvolutionDetails(pokemonName);
  const { details: evolutionDetails, loading: loadingDetails, error: errorDetails } = useEvolutionChainDetails(evolutionChain);
  const { pokemon } = usePokemonDetails(pokemonName);
  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;


  if (loading || loadingDetails || !pokemon) return <EvolutionChainSkeleton />;

  if (error || errorDetails) return <p>Error: {(error?.message || errorDetails?.message)}</p>;

  return (
    <div
      className="flex flex-col gap-4 justify-center mt-4 w-full h-fit px-15 py-5 rounded-lg"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="text-3xl font-bold">Evolution Chain</h1>
      <div className="flex items-center gap-8 justify-center px-10 flex-wrap flex-col md:flex-row">
        {evolutionDetails.map((poke, index) => (
          <div
            key={poke.id}
            className="flex items-center flex-col md:flex-row gap-8"
          >
            <div className="text-center">
              <img
                src={poke.sprites.other["official-artwork"].front_default}
                alt={poke.name}
                className="w-24 h-24"
              />
              <p className="capitalize text-xl font-bold">{poke.name}</p>
            </div>

            {index < evolutionDetails.length - 1 && (
              <span className="text-white text-3xl">
                <FaArrowRight className="rotate-90 md:rotate-0" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChain;
