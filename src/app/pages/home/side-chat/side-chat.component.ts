import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-chat',
  templateUrl: './side-chat.component.html',
  styleUrls: ['./side-chat.component.scss']
})
export class SideChatComponent implements OnInit {
  @Input() item: any;
  @Output() replyEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  click() {
    console.log(this.item);
  }
  clickReply(){
    this.replyEvent.emit(this.item);
  }
}
