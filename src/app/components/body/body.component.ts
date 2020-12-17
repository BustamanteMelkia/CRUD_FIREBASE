import { Component } from "@angular/core";

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html'
})
export class BodyComponent{
    btnActivo: boolean;
    frase: string;
    personajes: string[];
    constructor(){
        this.btnActivo = true;
        this.frase = 'Un gran poder requiere de una gran responsabilidad, the best';
        this.personajes = ['Spiderman', 'Goku', 'Antman', 'Thor'];
    }

    onClickBtn(){
        this.btnActivo = !this.btnActivo;
        console.log('Click zasss');
        
    }
}