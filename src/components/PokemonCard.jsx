import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";
import { useState } from "react";
import PokeDetailModal from "./PokeDetailModal";
import PokeCardFront from "./PokeCardFront";
import PokeCardBack from "./PokeCardBack";

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
          <PokeCardFront pokemon={pokemon} />

          {/* BACK */}
          <PokeCardBack pokemon={pokemon} />
        </div>
      </button>
    </>
  );
}

export default PokemonCard;
