import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Message } from '../interfaces/message.interface';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats:Message[] = [];

  constructor(private afs: AngularFirestore) { }

  loadMessages() {
    //this.itemsCollection = this.afs.collection<Message>('chats');
    //If we want to query to firebase we need to ...
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc')
                                                                           .limit(5));
    return this.itemsCollection.valueChanges()
                               .map((msges: Message[]) => {
                                  console.log(msges);

                                  //this.chats = msges;
                                  this.chats = [];

                                  for (let m of msges) {
                                      this.chats.unshift(m);
                                  }

                                  //the return statement is optional.
                                  //return this.chats;
                               });
  }

  addMessage(text: string) {
    let msg: Message = {
      name: 'Demo',
      message: text,
      date: new Date().getTime()
    }

    return this.itemsCollection.add(msg);
  }
}
