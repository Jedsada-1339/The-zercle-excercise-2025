import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrls: ['./pokemon-modal.component.css']
})
export class PokemonModalComponent implements OnChanges {
  @Input() selectedPokemon: Pokemon | null = null;
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  activeTab: 'about' | 'stats' = 'about';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPokemon'] && this.selectedPokemon) {
      // Reset to default tab when a new Pokemon is selected
      this.activeTab = 'about';
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  getTypeClass(type: string): string {
    const typeClasses: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-600',
      ground: 'bg-yellow-800',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-600',
      rock: 'bg-yellow-600',
      ghost: 'bg-purple-800',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    };

    return typeClasses[type.toLowerCase()] || 'bg-gray-500';
  }

  getBackgroundClass(type: string): string {
    const bgClasses: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-600',
      ground: 'bg-yellow-800',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-600',
      rock: 'bg-yellow-600',
      ghost: 'bg-purple-800',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    };

    return bgClasses[type.toLowerCase()] || 'bg-gray-500';
  }

  getStatColorClass(value: number): string {
    if (value < 50) return 'bg-red-500';
    if (value < 80) return 'bg-orange-500';
    if (value < 100) return 'bg-yellow-500';
    if (value < 150) return 'bg-green-500';
    return 'bg-blue-500';
  }
}