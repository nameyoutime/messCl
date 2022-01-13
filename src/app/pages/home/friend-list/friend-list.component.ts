import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  @Input() list: any;
  @Input() data: any;

  @Output() roomEvent = new EventEmitter<string>();
  public menu: boolean = true;
  constructor(private shareSer: ShareService) { }

  ngOnInit(): void {
    this.shareSer.menuUpdated.subscribe(val=>{
      this.menu = val;
    })
  }
  joinChat(room: string) {
    this.roomEvent.emit(room)
  }

}
