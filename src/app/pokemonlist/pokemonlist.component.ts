import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {
  public pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe((data: any) => {
      console.log(data);
      this.pokemonList = data.results;
    });
  }

  getPokemonImageUrl(pokemonUrl: string): string {
    const pokemonId = pokemonUrl.split('/').filter(segment => !!segment).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }
  
  
}
