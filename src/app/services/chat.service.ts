import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatsCollection: AngularFirestoreCollection<Message>;
  // La propiedad mensaje será accedida desde cualquier componente que requiera el servicio.
  // Para ello, es necesario realizar la suscripcion a los cambios en la colección de chats.
  // De esta forma cada vez que haya un nuevo mensaje se actualizará esta lista y los cambios
  // serán reflejados de manera global.
  messages: Message[] = [];
  constructor(private afs: AngularFirestore) {  }

  getChats(){
    // Obtener una referencia a la colección de chats que se encuentra en firebase.
    // Así mismo se realiza una consulta para que los datos obtenidos estén ordenados de forma ascendente
    // y debe retornar como límite 5 elementos.
    this.chatsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date','desc').limit(5));

    // Suscribirse a los cambios.
    // El observable no retorna ningún dato debido a que la idea es que la suscripción se realice en este servicio
    // logrando que la lista de mensajes sea global.
    return this.chatsCollection.valueChanges().pipe( map( (messages: Message[])=>{
      this.messages = [];
      // Ordenar los mensajes, de tal forma que el mensaje más actual aparezca hasta abajo del chat.
      for (const message of messages) {
        this.messages.unshift(message);
      }
      console.log(this.messages);
    } ) );
  }

  addMessage(text: string){
    const message: Message = {
      name: 'MElkia',
      text,
      date: new Date().getTime()
    }
    return this.chatsCollection.add(message);
  }
}
