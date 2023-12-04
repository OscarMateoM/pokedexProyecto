import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokeapi = 'https://pokeapi.co/api/v2/pokemon/';
  private pokemonIdUrl = '../assets/pokemon-id.json';
  private pokemonList: { [key: string]: number } = {};
  constructor(private http: HttpClient) {
    this.loadPokemonData();
  }

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
getPokemonDetailsByName(pokemonName: string): Observable<any> {
  const url = `${this.pokeapi}${pokemonName}/`;
  return this.http.get(url);
}
getPokemonImageByName(name: string): Observable<any> {
  const url = `${this.pokeapi}${name}/`;
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
getTypeEffectiveness(): Observable<any> {
  const url = 'assets/type-effectiveness.json';
  return this.http.get(url);
}

getPokemonSpecies(name: string): Observable<any> {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
  return this.http.get(url);
}

getEvolutionChain(pokemonId: number): Observable<any> {
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
  return this.http.get(speciesUrl).pipe(
    switchMap((species: any) => {
      const evolutionChainUrl = species.evolution_chain.url;
      return this.http.get(evolutionChainUrl);
    })
  );
}
getPokemonIdByName(name: string): Observable<number> {
  const url = '../assets/pokemon-id.json';
  return this.http.get<number>(url);
}
private loadPokemonData() {
  this.http.get<{ [key: string]: number }>(this.pokemonIdUrl).subscribe(
    (data) => {
      this.pokemonList = data;
      console.log('Pokemon data loaded successfully:', data);
    },
    (error) => {
      console.error('Error loading Pokemon data:', error);
    }
  );
}


getPokemonId(pokemonName: string): number | undefined {
  return this.pokemonList[pokemonName.toLowerCase()];
}
getMoveDetailsByFullUrl(moveFullUrl: string): Observable<any> {
  return this.http.get(moveFullUrl);
}
}


