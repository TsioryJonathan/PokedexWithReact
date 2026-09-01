import usePokemonEvolutionDetails from "@/hooks/usePokemonEvolutionDetails";
import useEvolutionChainDetails from "@/hooks/useEvolutionChainDetails";
import pokemonColors from "@/utils/pokemonColors";
import EvolutionChainSkeleton from "./EvolutionChainSkeleton";
import { FaArrowRight } from "react-icons/fa";
import EvolutionMiniCard from "./evolution/EvolutionMiniCard";

function EvolutionChain({ pokemon, loading: pokemonLoading }) {
  const { evolutionChain, loading, error } = usePokemonEvolutionDetails(
    pokemon?.name?.split("-")[0]
  );

  const {
    details: evolutionDetails,
    loading: loadingDetails,
    error: errorDetails,
  } = useEvolutionChainDetails(evolutionChain);

  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;

  if (pokemonLoading || loading || loadingDetails || !pokemon) return <EvolutionChainSkeleton />;
  if (error || errorDetails)
    return (
      <p className="text-red-500 text-lg text-center px-4">
        There was an error loading the evolution chain.
      </p>
    );

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-6"
      style={{ backgroundColor: bgColor }}
    >
      <h2 className="text-white text-2xl font-bold mb-6 text-center drop-shadow-md">
        Evolution Chain
      </h2>
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-6 flex-wrap justify-center">
        {evolutionDetails.map((poke, index) => (
          <div
            key={poke.id}
            className="flex items-center gap-6 md:gap-4 flex-col md:flex-row"
          >
            <EvolutionMiniCard poke={poke} />
            {index < evolutionDetails.length - 1 && (
              <FaArrowRight
                className="text-white/80 text-2xl md:text-xl rotate-90 md:rotate-0 animate-pulse"
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
