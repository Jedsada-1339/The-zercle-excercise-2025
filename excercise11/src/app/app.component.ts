  
import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/pokemon';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allPokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  paginatedPokemon: Pokemon[] = [];
  
  selectedPokemon: Pokemon | null = null;
  showModal: boolean = false;
  
  // Filter state
  selectedGeneration: number = 0;
  selectedType: string = 'all';
  
  // Pagination state
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokemonService.getPokemon().subscribe(pokemon => {
      this.allPokemon = pokemon;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.allPokemon];
    
    // Filter by generation
    if (this.selectedGeneration !== 0) {
      filtered = filtered.filter(pokemon => pokemon.generation === this.selectedGeneration);
    }
    
    // Filter by type
    if (this.selectedType !== 'all') {
      filtered = filtered.filter(pokemon => pokemon.types.includes(this.selectedType));
    }
    
    this.filteredPokemon = filtered;
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPokemon = this.filteredPokemon.slice(startIndex, endIndex);
  }

  onGenerationSelected(generation: number): void {
    this.selectedGeneration = generation;
    this.currentPage = 1; // Reset to first page when changing filters
    this.applyFilters();
  }

  onTypeSelected(type: string): void {
    this.selectedType = type;
    this.currentPage = 1; // Reset to first page when changing filters
    this.applyFilters();
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  onItemsPerPageChanged(items: number): void {
    this.itemsPerPage = items;
    this.updatePaginatedItems();
  }

  onPokemonSelected(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}