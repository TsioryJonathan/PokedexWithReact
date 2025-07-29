import assets from "@/assets/assets";

export default function PokeImage({ pokemon, className, imageClassName, bgClassName }) {
  return (
    <div className={`${className}`}>
    <img
      src={assets.bg}
      alt=" "
      className={`${bgClassName}`}
    />
    <img
      src={pokemon.image}
      alt={pokemon.name}
      className={`${imageClassName}`}
    />
  </div>
  );
}
