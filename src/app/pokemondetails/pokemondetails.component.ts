import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Observable, forkJoin, map, pipe } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemondetails.component.html',
  styleUrls: ['./pokemondetails.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  private _pokemonDetails: any;
  private _pokemonTypes: string[] = [];
  private _pokemonDescription: any;
  private _typeEffectiveness: any;
  private _evolutionChain: any;


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
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pokemonId = +params['id'];

      forkJoin([
        this.pokemonService.getPokemonDetailsById(pokemonId),
        this.pokemonService.getPokemonTypes(pokemonId.toString()),
        this.pokemonService.getTypeEffectiveness(),
        this.pokemonService.getEvolutionChain(pokemonId)
      ]).subscribe(
        ([pokemonDetails, pokemonTypes, typeEffectiveness, evolutionChain]: [any, string[], any, any]) => {
          this._pokemonDetails = pokemonDetails;
          this._pokemonTypes = pokemonTypes;
          this._typeEffectiveness = typeEffectiveness;
          this._evolutionChain = evolutionChain;
        }
      );

      this.getPokemonDescription(pokemonId);
    });
  }
  

  getPokemonDetails(pokemonId: number) {
    this.pokemonService.getPokemonDetailsById(pokemonId).subscribe(
      (data: any) => {
        this._pokemonDetails = data;
      }
    );
  }
  getPokemonImage(name: string): string {
    const capitalizedPokemonName = name.charAt(0).toUpperCase() + name.slice(1);
    return `https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/95/latest/20160817212623/${capitalizedPokemonName}.png/200px-${capitalizedPokemonName}.png`;
  }
  
  get typeEffectiveness() {
    return this._typeEffectiveness;
  }
  get evolutionChain() {
    return this._evolutionChain;
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
 
  get pokemonTypes() {
    return this._pokemonTypes;
  } 

  getStatWidthPercentage(baseStat: number): string {
    const maxStat = 255;
    const percentage = (baseStat / maxStat) * 100;
    return percentage + '%';
  }

  getPokemonDescription(pokemonId: number) {
    this.pokemonService.getPokemonDescription(pokemonId.toString()).subscribe(
      (description: string) => {
        this._pokemonDescription = description;
      },

    );
  }

  get pokemonDescription() {
    return this._pokemonDescription;
  }

  getColorBarra(baseStat: number): string {
    if (baseStat <= 40) {
      return 'red';
    } else if (baseStat < 65) {
      return 'hardorange';
    } else if (baseStat <= 80) {
      return 'orange';
    } else if (baseStat <= 100) {
      return 'yellow';
    } else if (baseStat <= 120) {
      return 'green';
    } else {
      return 'hardgreen';
    }
  }
  getEvolutionTrigger(evolution: any): string {
    if (evolution.evolution_details && evolution.evolution_details.length > 0) {
      return evolution.evolution_details[0].trigger.name;
    }
    return '';
  }
  getEvolutionLevel(evolution: any): string {
      return evolution.evolution_details[0].min_level;
  }
  getEvolutionItem(evolution: any): string {
    if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].item && evolution.evolution_details[0].item.name) {
      return evolution.evolution_details[0].item.name;
  } else {
      return '';
  }
}
getEvolutionHappiness(evolution: any): string {
  if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].min_happiness) {
    return evolution.evolution_details[0].min_happiness + " happiness";
} else {
    return '';
}
}
getEvolutionLocation(evolution: any): string {
  if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].location && evolution.evolution_details[0].location.name) {
    return evolution.evolution_details[0].location.name;
} else {
    return '';
}
}
getEvolutionKnownMoveType(evolution: any): string {
  if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].known_move_type && evolution.evolution_details[0].known_move_type.name) {
    return "known move type " + evolution.evolution_details[0].known_move_type.name ;
} else {
    return '';
}
}
getEvolutionKnownMove(evolution: any): string {
  if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].known_move && evolution.evolution_details[0].known_move.name) {
    return "known move " + evolution.evolution_details[0].known_move.name ;
} else {
    return '';
}
}
getEvolutionHeldItem(evolution: any): string {
  if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].held_item && evolution.evolution_details[0].held_item.name) {
    return "held " + evolution.evolution_details[0].held_item.name ;
} else {
    return '';
}
}
getEvolutionGender(evolution: any): string {
  if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].gender) {
    const gender = evolution.evolution_details[0].gender;

    if (gender === 1) {
      return 'Female gender';
    } else if (gender === 2) {
      return 'Male gender';
    } else {
      return '';
    }
  } else {
    return '';
  }
}
getEvolutionBeauty(evolution: any): string {
  if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].min_beauty) {
    return "min " + evolution.evolution_details[0].min_beauty + " beauty";
} else {
    return '';
}
}
getEvolutionStats(evolution: any): string {
  if (evolution && evolution.evolution_details && evolution.evolution_details.length > 0 && evolution.evolution_details[0].relative_physical_stats) {
    const stat = evolution.evolution_details[0].relative_physical_stats;

    if (stat === 1) {
      return 'attack > defense';
    } else if (stat === -1) {
      return 'attack < defense';
    } else if (stat === 0) {
      return 'attack = defense';
    } else {
      return '';
    }
  } else {
    return '';
  }
}

getPokemonId(pokemonName: string): number | undefined {
  return this.pokemonService.getPokemonId(pokemonName);
}
getMoveDetailsByFullUrl(moveFullUrl: string): Observable<any> {
  return this.pokemonService.getMoveDetailsByFullUrl(moveFullUrl);
}
}





