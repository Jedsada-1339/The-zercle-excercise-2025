// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // Mock data for demo (without API)
  private pokemonList: Pokemon[] = [
    {
      id: 1,
      name: 'Bulbasaur',
      types: ['grass', 'poison'],
      species: 'Seed Pokémon',
      height: 0.7,
      weight: 6.9,
      abilities: ['Overgrow', 'Chlorophyll'],
      stats: [
        { name: 'HP', value: 45 },
        { name: 'Attack', value: 49 },
        { name: 'Defense', value: 49 },
        { name: 'Sp. Atk', value: 65 },
        { name: 'Sp. Def', value: 65 },
        { name: 'Speed', value: 45 }
      ],
      generation: 1,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    },
    {
      id: 4,
      name: 'Charmander',
      types: ['fire'],
      species: 'Lizard Pokémon',
      height: 0.6,
      weight: 8.5,
      abilities: ['Blaze', 'Solar Power'],
      stats: [
        { name: 'HP', value: 39 },
        { name: 'Attack', value: 52 },
        { name: 'Defense', value: 43 },
        { name: 'Sp. Atk', value: 60 },
        { name: 'Sp. Def', value: 50 },
        { name: 'Speed', value: 65 }
      ],
      generation: 1,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
    },
    {
      id: 7,
      name: 'Squirtle',
      types: ['water'],
      species: 'Tiny Turtle Pokémon',
      height: 0.5,
      weight: 9.0,
      abilities: ['Torrent', 'Rain Dish'],
      stats: [
        { name: 'HP', value: 44 },
        { name: 'Attack', value: 48 },
        { name: 'Defense', value: 65 },
        { name: 'Sp. Atk', value: 50 },
        { name: 'Sp. Def', value: 64 },
        { name: 'Speed', value: 43 }
      ],
      generation: 1,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png'
    },
    {
      id: 25,
      name: 'Pikachu',
      types: ['electric'],
      species: 'Mouse Pokémon',
      height: 0.4,
      weight: 6.0,
      abilities: ['Static', 'Lightning Rod'],
      stats: [
        { name: 'HP', value: 35 },
        { name: 'Attack', value: 55 },
        { name: 'Defense', value: 40 },
        { name: 'Sp. Atk', value: 50 },
        { name: 'Sp. Def', value: 50 },
        { name: 'Speed', value: 90 }
      ],
      generation: 1,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    },
    {
      id: 152,
      name: 'Chikorita',
      types: ['grass'],
      species: 'Leaf Pokémon',
      height: 0.9,
      weight: 6.4,
      abilities: ['Overgrow', 'Leaf Guard'],
      stats: [
        { name: 'HP', value: 45 },
        { name: 'Attack', value: 49 },
        { name: 'Defense', value: 65 },
        { name: 'Sp. Atk', value: 49 },
        { name: 'Sp. Def', value: 65 },
        { name: 'Speed', value: 45 }
      ],
      generation: 2,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png'
    },
    {
      id: 155,
      name: 'Cyndaquil',
      types: ['fire'],
      species: 'Fire Mouse Pokémon',
      height: 0.5,
      weight: 7.9,
      abilities: ['Blaze', 'Flash Fire'],
      stats: [
        { name: 'HP', value: 39 },
        { name: 'Attack', value: 52 },
        { name: 'Defense', value: 43 },
        { name: 'Sp. Atk', value: 60 },
        { name: 'Sp. Def', value: 50 },
        { name: 'Speed', value: 65 }
      ],
      generation: 2,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png'
    },
    {
      id: 252,
      name: 'Treecko',
      types: ['grass'],
      species: 'Wood Gecko Pokémon',
      height: 0.5,
      weight: 5.0,
      abilities: ['Overgrow', 'Unburden'],
      stats: [
        { name: 'HP', value: 40 },
        { name: 'Attack', value: 45 },
        { name: 'Defense', value: 35 },
        { name: 'Sp. Atk', value: 65 },
        { name: 'Sp. Def', value: 55 },
        { name: 'Speed', value: 70 }
      ],
      generation: 3,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png'
    },
    {
      id: 255,
      name: 'Torchic',
      types: ['fire'],
      species: 'Chick Pokémon',
      height: 0.4,
      weight: 2.5,
      abilities: ['Blaze', 'Speed Boost'],
      stats: [
        { name: 'HP', value: 45 },
        { name: 'Attack', value: 60 },
        { name: 'Defense', value: 40 },
        { name: 'Sp. Atk', value: 70 },
        { name: 'Sp. Def', value: 50 },
        { name: 'Speed', value: 45 }
      ],
      generation: 3,
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png'
    }
  ];

  constructor() { }

  // Get all pokemon
  getPokemon(): Observable<Pokemon[]> {
    return of(this.pokemonList);
  }

  // Get pokemon by ID
  getPokemonById(id: number): Observable<Pokemon | undefined> {
    const pokemon = this.pokemonList.find(p => p.id === id);
    return of(pokemon);
  }

  // Get all pokemon types from the available data
  getPokemonTypes(): Observable<string[]> {
    const typesSet = new Set<string>();
    this.pokemonList.forEach(pokemon => {
      pokemon.types.forEach(type => typesSet.add(type));
    });
    return of(Array.from(typesSet));
  }

  // Get all available generations
  getGenerations(): Observable<number[]> {
    const genSet = new Set<number>();
    this.pokemonList.forEach(pokemon => {
      genSet.add(pokemon.generation);
    });
    return of(Array.from(genSet).sort());
  }

  // Filter pokemon by type
  filterByType(type: string): Observable<Pokemon[]> {
    if (type === 'all') {
      return of(this.pokemonList);
    }
    const filtered = this.pokemonList.filter(pokemon => 
      pokemon.types.includes(type)
    );
    return of(filtered);
  }

  // Filter pokemon by generation
  filterByGeneration(gen: number): Observable<Pokemon[]> {
    if (gen === 0) {
      return of(this.pokemonList);
    }
    const filtered = this.pokemonList.filter(pokemon => 
      pokemon.generation === gen
    );
    return of(filtered);
  }
}