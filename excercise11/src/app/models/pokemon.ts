export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  species: string;
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
  generation: number;
  imageUrl: string;
}