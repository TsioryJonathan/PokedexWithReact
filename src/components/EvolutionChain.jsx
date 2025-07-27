// components/EvolutionChain.jsx
import usePokemonEvolutionDetails from "@/hooks/usePokemonEvolutionDetails";
import useEvolutionChainDetails from "@/hooks/useEvolutionChainDetails";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import pokemonColors from "@/utils/pokemonColors";
import EvolutionChainSkeleton from "./EvolutionChainSkeleton";
import { FaArrowRight } from "react-icons/fa";
import EvolutionMiniCard from "./EvolutionMiniCard";

function EvolutionChain({ pokemonName }) {
  const { evolutionChain, loading, error } = usePokemonEvolutionDetails(
    pokemonName.split("-")[0]
  );

  const {
    details: evolutionDetails,
    loading: loadingDetails,
    error: errorDetails,
  } = useEvolutionChainDetails(evolutionChain);

  const { pokemon } = usePokemonDetails(pokemonName);
  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;

  if (loading || loadingDetails || !pokemon) return <EvolutionChainSkeleton />;
  if (error || errorDetails)
    return (
      <p className="text-red-500 text-lg">
        There was an error loading the evolution chain.
      </p>
    );
  return (
    <div
      className="flex flex-col gap-6 w-full h-fit px-6 py-6 rounded-lg relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-6 flex-wrap justify-center">
        {evolutionDetails.map((poke, index) => (
          <div key={poke.id} className="flex items-center gap-6 md:gap-4">
            <EvolutionMiniCard poke={poke} />
            {index < evolutionDetails.length - 1 && (
              <FaArrowRight
                className="text-white/70 text-2xl md:text-xl rotate-90 md:rotate-0"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white,transparent_60%)]" />
    </div>
  );
}

export default EvolutionChain;
