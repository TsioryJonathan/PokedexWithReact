// hooks/useRandomPokemon.js
export function useRandomPokemon(max = 1025) {
  const pick = () => Math.floor(Math.random() * max) + 1;
  return () => `pokemon/${pick()}`; // renvoie une route
}
