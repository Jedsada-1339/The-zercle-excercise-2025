
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-gen-filter',
  templateUrl: './gen-filter.component.html',
  styleUrls: ['./gen-filter.component.css']
})
export class GenFilterComponent implements OnInit {
  @Output() generationSelected = new EventEmitter<number>();
  @Output() typeSelected = new EventEmitter<string>();
  
  generations: number[] = [0]; // 0 means all generations
  types: string[] = [];
  selectedGen: number = 0;
  selectedType: string = 'all';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    // Get all available generations
    this.pokemonService.getGenerations().subscribe(gens => {
      this.generations = [0, ...gens]; // Add '0' for 'All' option
    });

    // Get all available types
    this.pokemonService.getPokemonTypes().subscribe(types => {
      this.types = types;
    });
  }

  selectGeneration(gen: number): void {
    this.selectedGen = gen;
    this.generationSelected.emit(gen);
  }

  selectType(): void {
    this.typeSelected.emit(this.selectedType);
  }
}