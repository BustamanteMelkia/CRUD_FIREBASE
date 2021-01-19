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

  getHero(id: string){
    return this.http.get(`${ this.url }/heros/${ id }.json`);
  }

  // Método que devuelve la lista de heroes.
  // La respuesta de la petición es un objeto y se usa el Object.values() para convertir
  // el objeto en un array.
  getHeros(){
    return this.http.get(`${this.url}/heros.json`).pipe(
      map( this.createHerosList )
    );
  }

  removeHero( id: string){
    return this.http.delete(`${ this.url }/heros/${ id }.json`);
  }

  // Método que procesa un objeto y regresa un array de heroes
  private createHerosList(herosObj: object){
    let heros: HeroModel [] = [];
    if(herosObj == null) return [];

    // Recorrer el objecto por llaves, donde la llave es el id.
    Object.keys(herosObj).forEach( id =>{
      let hero: HeroModel = herosObj[id];
      hero.id = id;
      heros.push(hero);
    }); 
    return heros;
  }
}
