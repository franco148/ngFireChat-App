import { Component } from '@angular/core';

import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {

  message:string = "";

  constructor(private _chatService:ChatService) {
    this._chatService.loadMessages()
                     .subscribe((mgs:any[]) => {
                       console.log(mgs);
                     });
  }

  sendMessage() {
    console.log(this.message)
  }
}
