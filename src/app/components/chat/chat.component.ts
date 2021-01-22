import { Component, OnInit } from '@angular/core';

import { ChatService } from 'src/app/services/chat.service';

import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {
  mensaje: string;
  scrollContainer: any;
  constructor( public chatService: ChatService) { 
    this.chatService.getChats().subscribe(()=>{
      setTimeout(() => {
        // Cada vez que se agrega un nuevo mensaje, el scroll tiene que estar hasta abajo
        this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
      }, 5);
    });
  }

  ngOnInit(): void {
    this.scrollContainer = document.getElementById('app-mensajes');
    console.log(this.scrollContainer);
    
  }
  enviarMensaje(){
    if(this.mensaje){
      this.chatService.addMessage(this.mensaje)
        .then( ()=> this.mensaje = '' )
        .catch( (err)=> console.log('Ocurrió un error: ', err))
    }
  }
}
