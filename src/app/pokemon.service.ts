import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokeapi = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0.';

  constructor(private http: HttpClient) {
    
  }

  // Métodos y funcionalidades del servicio

  getPokemonById(pokemonId: number) {
    const url = `${this.pokeapi}/${pokemonId}`;
    return this.http.get(url);
  }
}
