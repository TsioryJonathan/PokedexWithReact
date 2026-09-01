export const API_URL = "https://pokeapi.co/api/v2/pokemon";

let allNamesCache = null;

export async function fetchPokemonPage(limit = 12, offset = 0) {
  try {
    const response = await fetch(
      `${API_URL}?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { results: data.results, count: data.count };
  } catch (error) {
    console.error("Failed to fetch Pokémon page:", error);
    return { results: [], count: 0 };
  }
}

export async function fetchAllPokemonNames() {
  if (allNamesCache) return allNamesCache;
  try {
    const response = await fetch(`${API_URL}?limit=1500&offset=0`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    allNamesCache = data.results;
    return allNamesCache;
  } catch (error) {
    console.error("Failed to fetch all Pokémon names:", error);
    return [];
  }
}

export async function fetchPokemonList(offset = 0) {
  return fetchPokemonPage(1500, offset).then((r) => r.results);
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
