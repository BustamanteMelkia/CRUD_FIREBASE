import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

// Components
import { HeroeComponent } from "src/app/pages/heroe/heroe.component";
import { HeroesComponent } from "src/app/pages/heroes/heroes.component";

const routes: Routes = [
  { path: "heroes", component: HeroesComponent },
  { path: "heroe/:id", component: HeroeComponent },
  { path: "**", pathMatch: "full", redirectTo: "heroes" }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }