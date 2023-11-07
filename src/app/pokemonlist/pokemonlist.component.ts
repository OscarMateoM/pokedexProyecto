import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ObservableInput, forkJoin } from 'rxjs';


@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {
  public pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    const getPokemonList$ = this.pokemonService.getPokemonList();
    const pokemonObservables: ObservableInput<any> = [];

    getPokemonList$.subscribe((data: any) => {
      this.pokemonList = data.results;

      const pokemonObservables = this.pokemonList.map((pokemon: any) => {
        return this.pokemonService.getPokemonTypes(pokemon.name);
      });
      
      forkJoin(pokemonObservables).subscribe((pokemonTypes: string[][]) => {
        this.pokemonList.forEach((pokemon, index) => {
          pokemon.types = pokemonTypes[index];
        });
      });
    });
  }

  getPokemonImageUrl(pokemonUrl: string): string {
    const pokemonId = pokemonUrl.split('/').filter(segment => !!segment).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }
  
  
  
}
