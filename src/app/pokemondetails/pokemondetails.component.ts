import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemondetails.component.html',
  styleUrls: ['./pokemondetails.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  private _pokemonDetails: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pokemonId = +params['id'];
      this.getPokemonDetails(pokemonId);
    });
  }

  getPokemonDetails(pokemonId: number) {
    this.pokemonService.getPokemonDetailsById(pokemonId).subscribe(
      (data: any) => {
        this._pokemonDetails = data;
      },
      error => {
        console.error('Error fetching Pokemon details:', error);
      }
    );
  }

  get pokemonDetails() {
    return this._pokemonDetails;
  }

  get pokemonName() {
    return this._pokemonDetails?.name;
  }

  get pokemonId() {
    return this._pokemonDetails?.id;
  }

  get pokemonWeight() {
    return this._pokemonDetails?.weight;
  }

  get pokemonHeight() {
    return this._pokemonDetails?.height;
  }

  get pokemonStats() {
    return this._pokemonDetails?.stats;
  }

  get pokemonImageUrl() {
    const pokemonId = this.pokemonId;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

  get pokemonShinyImageUrl() {
    const pokemonId = this.pokemonId;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonId}.png`;
  }
}


