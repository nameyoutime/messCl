import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  @Input() list:any;
  @Output() roomEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  joinChat(room:string){
    this.roomEvent.emit(room)
  }

}
