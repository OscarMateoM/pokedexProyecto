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
      console.log(data); // Agrega esta línea para ver los datos en la consola
      this.pokemonList = data.results;
    });
  }

  getPokemonImageUrl(pokemonUrl: string): string {
    const pokemonId = pokemonUrl.split('/').filter(segment => !!segment).pop();
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;
  }
  
  
}
