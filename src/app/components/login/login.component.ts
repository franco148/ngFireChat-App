import { Component } from '@angular/core';

import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(private _chatService:ChatService) { }

  logIn(provider:string) {
    console.log(provider);
    this._chatService.login(provider);
  }
}
