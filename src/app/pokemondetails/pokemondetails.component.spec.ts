import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemondetailsComponent } from './pokemondetails.component';

describe('PokemondetailsComponent', () => {
  let component: PokemondetailsComponent;
  let fixture: ComponentFixture<PokemondetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemondetailsComponent]
    });
    fixture = TestBed.createComponent(PokemondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
