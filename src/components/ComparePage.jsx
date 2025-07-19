import React, { useState } from 'react';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import usePokemonEvolutionDetails from '../hooks/usePokemonEvolutionDetails';
import usePokemonList from '../hooks/usePokemonList';
import pokemonColors from "@/utils/pokemonColors";
import getTypeGradient from "@/utils/getTypeGradient";
import SelectCombobox from "@/components/ui/SelectCombobox";

const ComparePage = () => {
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [selectedName1, setSelectedName1] = useState('');
  const [selectedName2, setSelectedName2] = useState('');

  const { pokemonList, loading: loadingList, error: errorList } = usePokemonList();
  const { pokemon: pokemon1, loading: loading1 } = usePokemonDetails(selectedName1);
  const { pokemon: pokemon2, loading: loading2 } = usePokemonDetails(selectedName2);

  console.log(pokemon1)

  usePokemonEvolutionDetails(selectedName1);
  usePokemonEvolutionDetails(selectedName2);

  const filteredResults1 = pokemonList.filter(p => p.name.includes(searchTerm1.toLowerCase())).slice(0, 5);
  const filteredResults2 = pokemonList.filter(p => p.name.includes(searchTerm2.toLowerCase())).slice(0, 5);

  const handleSelectPokemon1 = (name) => {
    setSelectedName1(name);
    setSearchTerm1(name);
  };

  const handleSelectPokemon2 = (name) => {
    setSelectedName2(name);
    setSearchTerm2(name);
  };

  const renderStatBar = (statValue) => {
    const percentage = Math.min((statValue / 255) * 100, 100);
    const color = statValue < 50 ? 'bg-red-500' : statValue < 90 ? 'bg-yellow-500' : 'bg-green-500';
    return (
      <div className='w-full h-3 rounded-full bg-gray-200'>
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };

  return (
    <div className='max-w-4xl mx-auto p-4 overflow-visible'>
      <h1 className='text-3xl font-bold text-center mb-8'>Comparer des Pokémon</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {[1, 2].map(num => {
          const searchTerm = num === 1 ? searchTerm1 : searchTerm2;
          const setSearchTerm = num === 1 ? setSearchTerm1 : setSearchTerm2;
          const filteredResults = num === 1 ? filteredResults1 : filteredResults2;
          const handleSelect = num === 1 ? handleSelectPokemon1 : handleSelectPokemon2;
          const pokemon = num === 1 ? pokemon1 : pokemon2;
          const loading = num === 1 ? loading1 : loading2;

          return (
            <div key={num} className='relative'>
              <div className='mb-4'>
                <SelectCombobox
                  value={searchTerm}
                  onChange={setSearchTerm}
                  options={pokemonList.map(p => ({ value: p.name, label: p.name }))}
                  onSelect={handleSelect}
                  placeholder='Rechercher un Pokémon...'
                  className='w-full'
                />
              </div>

              {loading ? (
                <div className='text-center'>Chargement...</div>
              ) : pokemon ? (
                <div
                  className={`rounded-lg shadow p-4 text-center ${getTypeGradient(pokemon.types[0]?.toLowerCase() || 'default')}`}
                >
                  <h2 className='text-xl font-bold capitalize mb-2 text-white drop-shadow'>{pokemon.name}</h2>
                  <img src={pokemon.image} alt={pokemon.name} className='h-40 w-40 object-contain mx-auto' />
                  <div className='flex justify-center gap-2 mt-2'>
                    {pokemon.types.map(type => (
                      <span
                        key={type}
                        className={`px-2 py-1 rounded-full text-xs font-semibold bg-white/30 text-white shadow capitalize`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='text-center text-gray-400'>Aucun Pokémon sélectionné</div>
              )}
            </div>
          );
        })}
      </div>

      {pokemon1 && pokemon2 && (
        <div className='mt-8 p-4 bg-white rounded shadow'>
          <h2 className='text-xl font-bold mb-4 text-center'>Comparaison des statistiques</h2>
          {pokemon1.stats.map((stat, index) => {
            const stat2 = pokemon2.stats[index];
            return (
              <div key={stat.name} className='mb-4'>
                <div className='flex justify-between text-sm font-medium'>
                  <span>{stat.name.toUpperCase()}</span>
                  <span>{stat.value} vs {stat2.value}</span>
                </div>
                <div className='grid grid-cols-2 gap-2 mt-1'>
                  {renderStatBar(stat.value)}
                  {renderStatBar(stat2.value)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComparePage;
