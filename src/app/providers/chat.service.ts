import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Message } from '../interfaces/message.interface';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats:Message[] = [];

  constructor(private afs: AngularFirestore) { }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats');
    return this.itemsCollection.valueChanges()
                               .map((msges: Message[]) => {
                                  console.log(msges);

                                  this.chats = msges;
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
