import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonserviceService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
  constructor(private http: HttpClient) { }
}
