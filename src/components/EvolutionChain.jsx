import { useState, useEffect } from "react";
import usePokemonEvolutionDetails from "@/hooks/usePokemonEvolutionDetails";
import { Loader2 } from "lucide-react";
import pokemonColors from "@/utils/pokemonColors";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { FaArrowRight } from "react-icons/fa";

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

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className="flex flex-col gap-4 justify-center mt-4 w-full h-fit px-15 py-5 rounded-lg"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="text-3xl font-bold">Evolution Chain</h1>
      <div className="flex items-center gap-8 justify-center px-10 flex-wrap">
        {evolutionDetails.map((poke, index) => (
          <div key={poke.id} className="flex items-center gap-8">
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
                <FaArrowRight />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChain;
