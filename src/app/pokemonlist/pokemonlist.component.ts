import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {
  public pokemonList: any[] = [];
  public searchTerm: string = '';
  public filteredPokemonList: any[] = [];

  typeImageMappings: { [key: string]: string } = {
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
    private pokemonService: PokemonService) {}

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
        this.filteredPokemonList = this.pokemonList;
      });
    });
  }
 

  getPokemonImageUrl(pokemonUrl: string): string {
    const pokemonId = pokemonUrl.split('/').filter(segment => !!segment).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }
  onSearch() {
    // Filtra la lista de Pokémon en función del término de búsqueda
    if (this.searchTerm) {
      this.filteredPokemonList = this.pokemonList.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Si el término de búsqueda está vacío, muestra todos los Pokémon
      this.filteredPokemonList = this.pokemonList;
    }
  }
  getPokemonId(pokemonUrl: string): number {
    const segments = pokemonUrl.split('/').filter(segment => !!segment);
    const idSegment = segments[segments.length - 1];
    const id = parseInt(idSegment, 10);
    return id;
  }
  
}

