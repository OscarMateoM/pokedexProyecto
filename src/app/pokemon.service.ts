import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokeapi = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemonList() {
    const url = this.pokeapi;
    return this.http.get(url);
  }
}

