import { PlantPokemon, FirePokemon, WaterPokemon, InsectPokemon, NormalPokemon, SerpentPokemon } from './../constants/CardsComposants.jsx'

const typeColors = {
    Plant: "bg-lime-300",
    Poison: "bg-purple-400",
    Fire: "bg-orange-400",
    Flying: "bg-sky-300",
    Water: "bg-blue-300",
    Electric: "bg-yellow-300 text-black",
    Psychic: "bg-pink-400",
    Grass: "bg-green-400",
    Bug: "bg-lime-500",
    Normal: "bg-gray-300",
};

const getTypeColor = (type) => {
    return typeColors[type] || "bg-gray-300";
};


export const PokemonCards = () => {
    return (
        <div className="bg-[var(--background)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 px-35">
                {PlantPokemon.map((pokemon) => (
                    <div key={pokemon.number} className="bg-gradient-to-b from-emerald-400 to-emerald-100 rounded-xl shadow-xl p-7 text-center transition-transform duration-300 ease-in-out hover:scale-95 border-t-gray-400 border-t-gray-300 border-t-3 border-l-3 border-b-gray-700 border-r-gray-500 border-b-3 border-r-3">

                        <div className="relative w-full h-60 flex items-center justify-center">
                            <img src="/src/assets/BG.png" alt="card background" className="absolute w-full h-full object-cover rounded-lg opacity-45 brightness-80 border-5 border-neutral-900" />
                            <img src={pokemon.img} alt={pokemon.name} className="relative z-10 object-contain" />
                        </div>

                        <h1 className="text-xl font-bold mt-4">-{pokemon.name}-</h1>
                        <h2 className="text-gray-600 mt-3">{pokemon.number}</h2>

                        <div className="flex justify-center gap-2 mt-2 text-sm text-gray-800 pt-6 pb-2">
                            <p className="bg-lime-300 px-5 rounded-lg py-1">{pokemon.element1}</p>
                            <p className="bg-purple-400 px-5 rounded-lg py-1">{pokemon.element2}</p>
                        </div>

                    </div>
                ))}

                {FirePokemon.map((pokemon) => (
                    <div key={pokemon.number} className="bg-gradient-to-b from-orange-300 to-red-50 rounded-xl shadow-xl overflow-hidden p-7 text-center transition-transform duration-300 ease-in-out hover:scale-95 border-t-gray-400 border-t-gray-300 border-t-3 border-l-3 border-b-gray-700 border-r-gray-500 border-b-3 border-r-3">

                        <div className="relative w-full h-60 flex items-center justify-center">
                            <img src="/src/assets/BG.png" alt="card background" className="absolute w-full h-full object-cover rounded-lg opacity-45 brightness-80 border-5 border-neutral-900" />
                            <img src={pokemon.img} alt={pokemon.name} className="relative z-10 object-contain" />
                        </div>

                        <h1 className="text-xl font-bold mt-4">-{pokemon.name}-</h1>
                        <h2 className="text-gray-600 mt-3">{pokemon.number}</h2>

                        <div className="flex justify-center gap-2 mt-2 text-sm text-gray-800 pt-6 pb-2">
                            <p className={`${getTypeColor(pokemon.element1)} px-5 rounded-lg py-1`}>
                                {pokemon.element1}
                            </p>
                            {pokemon.element2 && (
                                <p className={`${getTypeColor(pokemon.element2)} px-5 rounded-lg py-1`}>
                                    {pokemon.element2}
                                </p>
                            )}
                        </div>

                    </div>
                ))}

                {WaterPokemon.map((pokemon) => (
                    <div key={pokemon.number} className="bg-gradient-to-b from-cyan-500 to-blue-100 rounded-xl shadow-xl overflow-hidden p-7 text-center transition-transform duration-300 ease-in-out hover:scale-95 border-t-gray-400 border-t-gray-300 border-t-3 border-l-3 border-b-gray-700 border-r-gray-500 border-b-3 border-r-3">

                        <div className="relative w-full h-60 flex items-center justify-center">
                            <img src="/src/assets/BG.png" alt="card background" className="absolute w-full h-full object-cover rounded-lg opacity-45 brightness-80 border-5 border-neutral-900" />
                            <img src={pokemon.img} alt={pokemon.name} className="relative z-10 object-contain" />
                        </div>

                        <h1 className="text-xl font-bold mt-4">-{pokemon.name}-</h1>
                        <h2 className="text-gray-600 mt-3">{pokemon.number}</h2>

                        <div className="flex justify-center gap-2 mt-2 text-sm text-gray-800 pt-6 pb-2">
                            <p className={`${getTypeColor(pokemon.element1)} px-5 rounded-lg py-1`}>
                                {pokemon.element1}
                            </p>
                            {pokemon.element2 && (
                                <p className={`${getTypeColor(pokemon.element2)} px-5 rounded-lg py-1`}>
                                    {pokemon.element2}
                                </p>
                            )}
                        </div>

                    </div>
                ))}

                {InsectPokemon.map((pokemon) => (
                    <div key={pokemon.number} className="bg-gradient-to-b from-amber-700 to-amber-100 rounded-xl shadow-xl overflow-hidden p-7 text-center transition-transform duration-300 ease-in-out hover:scale-95 border-t-gray-400 border-t-gray-300 border-t-3 border-l-3 border-b-gray-700 border-r-gray-500 border-b-3 border-r-3">

                        <div className="relative w-full h-60 flex items-center justify-center">
                            <img src="/src/assets/BG.png" alt="card background" className="absolute w-full h-full object-cover rounded-lg opacity-45 brightness-80 border-5 border-neutral-900" />
                            <img src={pokemon.img} alt={pokemon.name} className="relative z-10 object-contain" />
                        </div>

                        <h1 className="text-xl font-bold mt-4">-{pokemon.name}-</h1>
                        <h2 className="text-gray-600 mt-3">{pokemon.number}</h2>

                        <div className="flex justify-center gap-2 mt-2 text-sm text-gray-800 pt-6 pb-2">
                            <p className={`${getTypeColor(pokemon.element1)} px-5 rounded-lg py-1`}>
                                {pokemon.element1}
                            </p>
                            {pokemon.element2 && (
                                <p className={`${getTypeColor(pokemon.element2)} px-5 rounded-lg py-1`}>
                                    {pokemon.element2}
                                </p>
                            )}
                        </div>

                    </div>
                ))}

                {NormalPokemon.map((pokemon) => (
                    <div key={pokemon.number} className="bg-gradient-to-b from-gray-500 to-gray-50 rounded-xl shadow-xl overflow-hidden p-7 text-center transition-transform duration-300 ease-in-out hover:scale-95 border-t-gray-400 border-t-gray-300 border-t-3 border-l-3 border-b-gray-700 border-r-gray-500 border-b-3 border-r-3">

                        <div className="relative w-full h-60 flex items-center justify-center">
                            <img src="/src/assets/BG.png" alt="card background" className="absolute w-full h-full object-cover rounded-lg opacity-45 brightness-80 border-5 border-neutral-900" />
                            <img src={pokemon.img} alt={pokemon.name} className="relative z-10 object-contain" />
                        </div>

                        <h1 className="text-xl font-bold mt-4">-{pokemon.name}-</h1>
                        <h2 className="text-gray-600 mt-3">{pokemon.number}</h2>

                        <div className="flex justify-center gap-2 mt-2 text-sm text-gray-800 pt-6 pb-2">
                            <p className={`${getTypeColor(pokemon.element1)} px-5 rounded-lg py-1`}>
                                {pokemon.element1}
                            </p>
                            {pokemon.element2 && (
                                <p className={`${getTypeColor(pokemon.element2)} px-5 rounded-lg py-1`}>
                                    {pokemon.element2}
                                </p>
                            )}
                        </div>

                    </div>
                ))}

                {SerpentPokemon.map((pokemon) => (
                    <div key={pokemon.number} className="bg-gradient-to-b from-violet-400 to-purple-200 rounded-xl shadow-xl overflow-hidden p-7 text-center transition-transform duration-300 ease-in-out hover:scale-95 border-t-gray-400 border-t-gray-300 border-t-3 border-l-3 border-b-gray-700 border-r-gray-500 border-b-3 border-r-3">

                        <div className="relative w-full h-60 flex items-center justify-center">
                            <img src="/src/assets/BG.png" alt="card background" className="absolute w-full h-full object-cover rounded-lg opacity-45 brightness-80 border-5 border-neutral-900" />
                            <img src={pokemon.img} alt={pokemon.name} className="relative z-10 object-contain" />
                        </div>

                        <h1 className="text-xl font-bold mt-4">-{pokemon.name}-</h1>
                        <h2 className="text-gray-600 mt-3">{pokemon.number}</h2>

                        <div className="flex justify-center gap-2 mt-2 text-sm text-gray-800 pt-6 pb-2">
                            <p className={`${getTypeColor(pokemon.element1)} px-5 rounded-lg py-1`}>
                                {pokemon.element1}
                            </p>
                            {pokemon.element2 && (
                                <p className={`${getTypeColor(pokemon.element2)} px-5 rounded-lg py-1`}>
                                    {pokemon.element2}
                                </p>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};
