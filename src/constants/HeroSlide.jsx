import { usePokemonDetails } from "@/hooks/usePokemonDetails";

export const popularPokemon = [
    "pikachu",
    "charizard",
    "bulbasaur",
    "squirtle",
    "mewtwo",
    "eevee",
    "lucario",
    "gengar",
    "dragonite",
    "snorlax",
];

function HeroSlide({ pokemonName }) {
    const { pokemon, loading, error } = usePokemonDetails(pokemonName);

    if (loading || !pokemon) return null;
    if (error) return <div className="text-red-500 text-center">Error loading Pokémon</div>;

    return (
        <div className="flex flex-col md:flex-row items-center justify-around gap-10 px-4">
            <div className="max-w-xl space-y-6 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome to your <span className="italic text-gray-200">Pokédex</span>
                </h1>
                <p className="text-gray-800 text-lg">
                    Dive into the incredible world of Pokémon and discover every detail about your favorite creatures. From stats to origins, everything is here.
                </p>
                <div className="ml-20">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Meet  <span className="text-white italic capitalize"> {pokemon.name}</span>
                    </h2>
                    <p className="text-gray-800 italic max-w-lg text-m ml-5 mt-2">
                        {pokemon.description}
                    </p>
                </div>
                {/* Optional button:
        <Link
          to={`/pokemon/${pokemon.name}`}
          className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded hover:brightness-110 transition"
        >
          See full details
        </Link> */}
                <p className="mt-6 ml-27 text-gray-900 text-xl">And meet many more Pokémon!</p>
            </div>

            <div className="w-full max-w-sm">
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-full h-auto object-contain drop-shadow-xl"
                />
            </div>
        </div>
    );
}

export default HeroSlide;
