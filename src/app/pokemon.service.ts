import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokeapi = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getPokemonList() {
    const url = `${this.pokeapi}?limit=493`;
    return this.http.get(url);
  }

  getPokemonTypes(pokemonNameOrId: string): Observable<string[]> {
    const url = `${this.pokeapi}${pokemonNameOrId}`;
    return this.http.get(url).pipe(
      map((pokemonData: any) => {
        return pokemonData.types.map((typeObj: any) => typeObj.type.name);
      })
    );
}

getPokemonDetails(id: string): Observable<any> {
  const url = `${this.pokeapi}${id}`;
  return this.http.get(url);
}

getPokemonDetailsById(id: number): Observable<any> {
  const url = `${this.pokeapi}${id}/`;
  return this.http.get(url);
}
  
getPokemonDescription(pokemonNameOrId: string): Observable<string> {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNameOrId}`;
  return this.http.get(url).pipe(
    map((speciesData: any) => {
      const flavorText = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'es'
      );
      return flavorText ? flavorText.flavor_text : '';
    })
  );
}


}

