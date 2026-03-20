import PokeCardBack from "../PokeCardBack";
import PokeCardFront from "../PokeCardFront";
import OwnedPokemonCardBack from "./OwnedPokemonCardBack";
import OwnedPokemonCardFront from "./OwnedPokemonCardFront";

function OwnedPokemonCard({ pokemon }) {
  return (
    <>
      <div className="group [perspective:1500px] min-w-[292px] min-h-[410px] w-[350px] md:w-[290px] cursor-pointer ">
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* FRONT */}
          <OwnedPokemonCardFront pokemon={pokemon} />

          {/* BACK */}
          <OwnedPokemonCardBack pokemon={pokemon} />
        </div>
      </div>
    </>
  );
}

export default OwnedPokemonCard;
