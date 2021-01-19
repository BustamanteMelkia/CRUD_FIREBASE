import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from "sweetalert2";

// Models
import { HeroModel } from 'src/app/models/hero.model';
// Services
import { HerosService } from 'src/app/services/heros.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {
  hero: HeroModel;
  constructor(
    private herosService: HerosService
  ) { 
    this.hero={
      name: '',
      power: '',
      alive: true 
    }
  }

  ngOnInit(): void {
  }

  onSave( form: NgForm){
    Swal.fire({
      title: 'Guardando datos',
      allowOutsideClick: false,
      text: 'Espere por favor'
    });
    Swal.showLoading();

    let request: Observable<any>;
    if(this.hero.id){
      request =  this.herosService.updateHero(this.hero);
    }else{
      console.log(form);
      request = this.herosService.createHero(this.hero);
    }
    request.subscribe(
      (resp)=>{
        Swal.fire({
          title: 'Datos actualizados',
          icon: 'success'
        });
      },
      (err)=>{
        Swal.fire({
          title: 'Datos no actualizados',
          icon: 'error'
        });
      }
    )
  }
}
