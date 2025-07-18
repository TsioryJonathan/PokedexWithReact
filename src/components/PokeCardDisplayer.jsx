import usePokemonList from "@/hooks/usePokemonList.js";
import PokemonCard from "./PokemonCard.jsx";

export const PokeCardDisplayer = ({ offset = 0, startIndex = 0 }) => {

  console.log("Poke render");
  
  const { pokemonList, loading, error } = usePokemonList(offset);

  const toShow = pokemonList.slice(startIndex, startIndex + 20);

  if (loading) return <div className="">Loading</div>;
  else if (error) return <div className="">Error fetching data</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-6">
      {toShow.map((pokemon, i) => (
        <PokemonCard pokemonName={pokemon.name} key={i} />
      ))}
    </div>
  );
};
