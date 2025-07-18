export const API_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemonList(limit = 20, offset = 0) {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    return [];
  }
}

export async function fetchPokemonDetails(pokemonNameOrId) {
  try {
    const response = await fetch(`${API_URL}/${pokemonNameOrId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Failed to fetch details for Pokémon ${pokemonNameOrId}:`,
      error
    );
    return null;
  }
}
