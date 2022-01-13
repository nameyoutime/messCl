import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss']
})
export class ChatMainComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() room: any;
  public user: any;

  @ViewChild("scrollMe") myScrollContainer: any;
  public data: any;
  public messages: Array<any> = [];
  public count: number = 0;
  public loading: boolean = false;
  public text: string = '';
  public addMore: boolean = false;


  uid: any = localStorage.getItem("uid");
  constructor(public roomSer: RoomService, private authSer: AuthService, private shareSer: ShareService) { }

  ngOnInit(): void {
    this.joinRoom(this.roomSer.currentRoom);
    this.authSer.changeUser.subscribe(data => {
      this.roomSer.setCurrentRoom(null);
      this.joinRoom(null);
    })
  }
  ngAfterViewChecked(): void {
    if (this.count == 0) {
      this.scrollToBottom();
    }
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  ngOnChanges(changes: any) {

    this.joinRoom(changes.room.currentValue);
  }

  async joinRoom(value: any) {
    // console.log(this.roomSer.lastRoom);

    this.loading = false;
    this.addMore = false;
    this.count = 0;
    let userData = await this.authSer.getUser(this.uid).toPromise();
    this.user = userData.data[0];
    if (value !== null && !this.addMore) {
      this.roomSer.join(value);
      this.roomSer.getRoom(value, this.count).subscribe((dataRoom: any) => {
        let arr = dataRoom.data;
        this.messages = [];
        for (let i = 0; i < arr.length; i++) {
          this.messages.push(arr[arr.length - i - 1]);
        }
        this.loading = true;

      })
      // let dataRoom: any = await this.roomSer.getRoom(value, this.count).toPromise();


    }
  }

  add() {
    this.addMore = true;
    this.count++;
    this.roomSer.getRoom(this.room, this.count).subscribe((data: any) => {
      let arr = data.data;
      // console.log(arr);
      if (arr.length == 0) {
        alert("out of data");
      }
      for (let i = 0; i < arr.length; i++) {
        this.messages.unshift(arr[i]);
      }
    });
  }

  async sendMessage() {
    let payload = {
      room: this.roomSer.currentRoom,
      message: this.text.trim(),
      user: this.user,
      time: this.shareSer.getDate(),
      index: this.messages.length
    }
    this.messages.push(payload);
    this.text = '';
    if (payload.message.length !== 0) {
      this.roomSer.sendMessage(payload).subscribe();
    }

  }

}
