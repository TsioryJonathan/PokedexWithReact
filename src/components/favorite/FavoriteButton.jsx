import React from "react";
import { Heart, HeartOff } from "lucide-react";
import { useFavorites } from "../../contexts/FavoritesContext";

export default function FavoriteButton({ pokemonName, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <button
      aria-label={isFavorite(pokemonName) ? "Remove from favorites" : "Add to favorites"}
      onClick={e => {
        e.stopPropagation();
        toggleFavorite(pokemonName);
      }}
      className={`absolute bottom-3 left-3 z-10 backdrop-blur-sm backdrop-grayscale-500  rounded-full p-1 shadow-md cursor-pointer hover:scale-110 hover:bg-pink-100/40 active:scale-90 transition ${className}`}
    >
      {isFavorite(pokemonName)
        ? <Heart size={20} className="text-red-500 fill-red-500" />
        : <HeartOff size={20} className="text-red-500" />}
    </button>
  );
}
