import { useState, useEffect } from "react";
import usePokemonEvolutionDetails from "@/hooks/usePokemonEvolutionDetails";
import { Loader2 } from "lucide-react";

function EvolutionChain({ pokemonName }) {
  const { evolutionChain, loading, error } =
    usePokemonEvolutionDetails(pokemonName);
  const [evolutionDetails, setEvolutionDetails] = useState([]);

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

  console.log(evolutionDetails);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex gap-4 justify-center mt-4 w-full h-fit bg-gray-400 px-10 py-15 rounded-lg">
      {evolutionDetails.map((poke) => (
        <div key={poke.id} className="text-center">
          <img
            src={poke.sprites.front_default}
            alt={poke.name}
            className="w-20 h-20"
          />
          <p className="capitalize">{poke.name}</p>
        </div>
      ))}
    </div>
  );
}

export default EvolutionChain;
