import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HeroModel } from '../models/hero.model';

// map operator from rxjs
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HerosService {
  url = "https://login-signig-default-rtdb.firebaseio.com/";
  constructor(
    private http: HttpClient
  ) { 
    console.log("Heros service works");
  }
  // Post request to create a new hero.
  createHero(hero: HeroModel){
    return this.http.post(`${this.url}/heros.json`, hero)
      .pipe(
        map(response=>{
          hero.id = response['name'];
          return hero;
        })
      );
  }
  // update hero data
  updateHero(hero: HeroModel){
    const heroTem = {
      ...hero
    };
    delete heroTem.id;
    return this.http.put(`${this.url}/heros/${hero.id}.json`,heroTem);
  }
  
}
