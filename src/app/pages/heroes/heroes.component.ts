import { Component, OnInit } from '@angular/core';
// Services
import { HerosService } from 'src/app/services/heros.service';
// Models
import { HeroModel } from 'src/app/models/hero.model';

import Swal from "sweetalert2";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  heros: HeroModel [];
  loading: boolean;
  constructor(
    private herosService: HerosService
  ) {
    this.loading = true;
    this.getData();
  }

  ngOnInit(): void {
  }
  private getData(){
    this.herosService.getHeros().subscribe(
      (heros: Array<HeroModel>)=> {
        this.heros = heros;
        this.loading = false;
      } ,
      (err)=> console.log(err)
    );
  }
  removeHero( hero: HeroModel, index: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro de borrar el usuario?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp=>{
      if (resp.value) {
        this.herosService.removeHero( hero.id ).subscribe(
          ()=>{        
            this.heros.splice(index, 1);
          }
        )
      }
    });
  }
}
