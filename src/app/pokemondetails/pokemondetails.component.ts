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
  getStatWidthPercentage(baseStat: number): string {
    const maxStat = 255; // Este valor puede variar según el máximo de las estadísticas
    const percentage = (baseStat / maxStat) * 100;
    return percentage + '%';
  }
}


