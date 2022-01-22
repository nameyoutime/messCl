import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
  animations: [
    trigger('widthGrow', [
      state(
        'closed',
        style({
          width: 0,

          // height: 0,
        })
      ),
      state(
        'open',
        style({
          width: '100%',
          // height: '100%',
        })
      ),
      // transition('* => *', animate(150)),
      transition('closed => open', animate('400ms ease-in-out')),
      transition('open => closed', animate('400ms ease-in-out')),
    ]),
  ],
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
      console.log(this.menu);
    })
  }
  joinChat(room: string) {
    // this.roo.leave();
    // console.log("test");
    this.roomEvent.emit(room)
  }

}
