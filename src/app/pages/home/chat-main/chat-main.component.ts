import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss']
})
export class ChatMainComponent implements OnInit, OnChanges {
  @Input() room: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: any) {
    this.joinRoom(changes.room.currentValue);
  }

  joinRoom(value: any) {
    if (value !== null) {
      console.log("change room to:", value);
    }
  }

}
