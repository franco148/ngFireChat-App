import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Message } from '../interfaces/message.interface';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats:Message[] = [];
  public user: any = {}


  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(usr =>{
      console.log('User state: ', usr);
    });
  }

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

  login(provider: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
