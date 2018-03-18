import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message:string = "";
  element:any;

  constructor(private _chatService:ChatService) {
    this._chatService.loadMessages()
                     .subscribe(()=>{

                       setTimeout(()=>{
                         this.element.scrollTop = this.element.scrollHeight;
                       }, 20);
                     });
  }

  ngOnInit() {
    this.element = document.getElementById('app-messages');
  }


  sendMessage() {
    //console.log(this.message)

    if (this.message.length === 0) {
        return;
    }

    this._chatService.addMessage(this.message)
        .then(()=> this.message = "")
        .catch((err)=> console.error('Error in sending the message', err));
  }
}
