import { useState, useEffect } from "react";
import usePokemonEvolutionDetails from "@/hooks/usePokemonEvolutionDetails";

import pokemonColors from "@/utils/pokemonColors";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { FaArrowRight } from "react-icons/fa";
import EvolutionChainSkeleton from "./EvolutionChainSkeleton";

function EvolutionChain({ pokemonName }) {
  const { evolutionChain, loading, error } =
    usePokemonEvolutionDetails(pokemonName);
  const [evolutionDetails, setEvolutionDetails] = useState([]);
  const { pokemon } = usePokemonDetails(pokemonName);
  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;

  useEffect(() => {
    const fetchAllDetails = async () => {
      if (!evolutionChain || evolutionChain.length === 0) return;

      try {
        const responses = await Promise.all(
          evolutionChain.map((name) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
              res.json()
            )
          )
        );
        setEvolutionDetails(responses);
      } catch (err) {
        console.error("Erreur lors de la récupération des détails :", err);
      }
    };

    fetchAllDetails();
  }, [evolutionChain]);

  if (loading || !pokemon) return <EvolutionChainSkeleton />;

  if (error) return <p>Error: {error.message}</p>;

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
