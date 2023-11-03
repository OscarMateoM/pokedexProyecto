import { TestBed } from '@angular/core/testing';

import { PokemonserviceService } from './pokemonservice.service';

describe('PokemonserviceService', () => {
  let service: PokemonserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
