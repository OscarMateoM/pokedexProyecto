import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pokemondetails/pokemondetails.component';
import { PokemonlistComponent } from './pokemonlist/pokemonlist.component';


const routes: Routes = [
  { path: '', component: PokemonlistComponent},
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
  { path: 'pokemon/:name', component: PokemonDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
