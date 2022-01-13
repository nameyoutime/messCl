import { Component, OnChanges, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(public roomSer: RoomService) { }
  public room: any = null;
  
  ngOnInit(): void {
    this.roomSer.currentRoomUpdated.subscribe(value => {
      this.room = value;
    });
  }




}
