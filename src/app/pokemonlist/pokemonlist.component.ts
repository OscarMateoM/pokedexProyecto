import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {
  public pokemonList: any[] = [];

  getTypes: { [key: string]: string } = {
    normal: '../../assets/images/normal.png',
    fire: '../../assets/images/fuego.png',
    water: '../../assets/images/agua.png',
    steel: '../../assets/images/acero.png',
    bug: '../../assets/images/bicho.png',
    dragon: '../../assets/images/dragon.png',
    electric: '../../assets/images/electrico.png',
    ghost: '../../assets/images/fantasma.png',
    fairy: '../../assets/images/hada.png',
    ice: '../../assets/images/hielo.png',
    fighting: '../../assets/images/lucha.png',
    grass: '../../assets/images/planta.png',
    psychic: '../../assets/images/psiquico.png',
    rock: '../../assets/images/roca.png',
    dark: '../../assets/images/siniestro.png',
    ground: '../../assets/images/tierra.png',
    poison: '../../assets/images/veneno.png',
    flying: '../../assets/images/volador.png',
 };

 constructor(
  private router: Router,
  private pokemonService: PokemonService
) {}

  ngOnInit() {
    const getPokemonList$ = this.pokemonService.getPokemonList();

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

  getPokemonImageShinyUrl(pokemonUrl: string): string {
    const pokemonId = pokemonUrl.split('/').filter(segment => !!segment).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonId}.png`;
  }
  
  getPokemonId(pokemonUrl: string): number {
    const segments = pokemonUrl.split('/').filter(segment => !!segment);
    const idSegment = segments[segments.length - 1];
    const id = parseInt(idSegment, 10);
    return id;
  }  

  navigateToDetail(pokemon: any) {
    console.log('Navigating to details for Pokemon:', pokemon);
    const pokemonId = this.getPokemonId(pokemon.url);
    this.router.navigate(['/pokemon', pokemonId]);
  }
}
