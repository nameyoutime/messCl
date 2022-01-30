import { AfterViewChecked, Component, HostListener, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { messages } from 'src/app/models/messages.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { ShareService } from 'src/app/services/share.service';
import { DataUrl, DOC_ORIENTATION, NgxImageCompressService, UploadResponse, } from 'ngx-image-compress';
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { WebsocketService } from 'src/app/services/websocket.service';
import { GroupMenuDialogComponent } from 'src/app/components/group-menu-dialog/group-menu-dialog.component';


@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],

})
export class ChatMainComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() room: any;
  public user: any;
  public firstLoad: boolean = false;
  public showEmojiPicker = false;
  public sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  public set = 'messenger';
  public size: number = 20;

  @ViewChild("scrollMe") myScrollContainer: any;
  public data: any;
  public messages: Array<messages> = [];
  public count: number = 0;
  public loading: boolean = false;
  public text: string = '';
  public addMore: boolean = false;
  public innerWidth: number = 0;
  public isMoblie: boolean = false;
  public reply: any = {};
  public imgs: Array<any> = [];
  private maxImgSizeValue: number = 60000;
  public currentAvatar: any = null;
  public isGroup: boolean = false;
  public currentRoom: string = '';
  uid: any = localStorage.getItem("uid");
  constructor(private socket: WebsocketService,
    private dialog: MatDialog,
    private imageCompress: NgxImageCompressService,
    public roomSer: RoomService,
    public authSer: AuthService,
    public shareSer: ShareService) {
    this.socketFunc();
  }

  ngOnInit(): void {
    this.isMoblie = this.checkIsMoblie();
    this.joinRoom(this.roomSer.currentRoom);
    this.authSer.changeUser.subscribe(data => {
      this.roomSer.setCurrentRoom(null);
      this.joinRoom(null);
    })
  }
  ngAfterViewChecked(): void {
    if (!this.loading) {
      this.scrollToBottom();
    }
  }
  socketFunc() {
    this.socket.on('sendMessage').subscribe((data: any) => {
      let index = this.shareSer.sortedIndex(this.messages, data);
      if (index < 0) {
        this.messages.push(data);
      } else {
        this.messages.splice(index, 0, data);
      }
      setTimeout(() => {

        this.scrollToBottom();
      }, 500);
    })
    this.socket.on('deleteMess').subscribe((data: any) => {
      let index = this.messages.findIndex(item => item._id == data);
      let indexRe = this.messages.findIndex(item => item.reply?._id == data);
      if (indexRe !== -1) {
        this.messages[indexRe].reply = {};
      }
      this.messages.splice(index, 1);
    })

  }
  replyClick(value: any) {
    this.reply = value;
  }
  deleteClick(value: any) {
    let index = this.messages.findIndex(item => item._id == value);
    let indexRe = this.messages.findIndex(item => item.reply?._id == value);
    if (indexRe !== -1) {
      this.messages[indexRe].reply = {};
    }
    this.messages.splice(index, 1);
    this.socket.emit('delete', { room: this.roomSer.currentRoom, data: value })
  }
  addEmoji(event: any) {
    this.text = `${this.text}${event.emoji.native}`
  }
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  checkImgAndReply(re: boolean = false, img: boolean = false) {
    let temp = Object.keys(this.reply).length;
    if (temp > 0) {
      return "10%";
    } else if (temp === 0) {
      return "50px";
    }
    return "100%";
  }

  checkConvert() {
    let temp = Object.keys(this.reply).length;

    if (temp > 0) {
      return 'calc(100% - 50px)';
    } else {
      return "90%";
    }
  }

  checkLengthReply() {
    return Object.keys(this.reply).length;
  }
  scrollToBottom(): void {
    if (this.myScrollContainer) {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
    }
  }
  ngOnChanges(changes: any) {
    if (this.roomSer.currentRoom !== null) {
      this.firstLoad = true;
    }
    this.joinRoom(changes.room.currentValue);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMoblie = this.checkIsMoblie();
  }

  checkIsMoblie() {
    if (window.innerWidth <= 425) {
      return true;
    }
    return false;
  }

  openGroupMenu() {
    let room = this.currentAvatar;
    let friends = this.authSer.user.friends;
    let config = {
      data: {
        room: room,
        friends: friends
      },
    }
    const dialogRef = this.dialog.open(GroupMenuDialogComponent, config);

  }
  async joinRoom(value: any) {
    this.loading = false;
    this.addMore = false;
    this.count = 0;
    this.user = this.authSer.user;
    this.currentAvatar = null;
    if (value !== null && !this.addMore) {
      this.currentRoom = value;
      this.roomSer.join(value);

      this.roomSer.getRoom(value).subscribe((res: any) => {
        let data = res.data;
        let user = res.data.user;
        if (!data.isGroup) {
          for (let i = 0; i < user.length; i++) {
            if (user[i].uid !== this.authSer.uid) {
              let temp = {
                ...user[i],
                isGroup: false
              }
              this.currentAvatar = temp;
              break;
            }
          }
        } else {
          this.isGroup = true;
          this.currentAvatar = data;
        }
      })
      this.roomSer.getMessage(value, this.count).subscribe((dataRoom: any) => {
        let arr = dataRoom.data;
        this.messages = [];
        for (let i = 0; i < arr.length; i++) {
          this.messages.push(arr[arr.length - i - 1]);
        }
        this.loading = true;
        // console.log(this.messages);
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
      })
    }
  }
  uploadMultipleFiles() {
    return this.imageCompress
      .uploadMultipleFiles()
      .then(
        (arrayOfFiles: { image: string, orientation: number }[]) => {
          for (let i = 0; i < arrayOfFiles.length; i++) {
            this.compressFile(arrayOfFiles[i].image, arrayOfFiles[i].orientation);
          }
        }
      );
  }

  compressFile(image: any, orientation: any) {
    this.imageCompress
      .compressFile(image, orientation, 50, 50)
      .then(
        (result: DataUrl) => {
          let img = this.imageCompress.byteCount(result);
          if (img >= this.maxImgSizeValue) {
            alert("file is larger than " + this.maxImgSizeValue / 1000 + "kb");
          } else {
            this.sendImg(result);
          }
        }
      );

  }

  add() {
    this.addMore = true;
    this.count++;

    if (this.room == null) {
      alert("error when getting data;");
      return;
    }
    this.roomSer.getMessage(this.room, this.count).subscribe((data: any) => {
      let arr = data.data;
      if (arr.length == 0) {
        alert("out of data");
      }
      for (let i = 0; i < arr.length; i++) {
        this.messages.unshift(arr[i]);
      }
    });
  }
  sendImg(image: string) {
    let payload = {} as messages;
    payload = {
      room: this.roomSer.currentRoom,
      image: image,
      user: this.authSer.user,
      status: false,
    }
    let fakepayload = {} as messages;
    fakepayload = { ...payload };
    this.messages.push(fakepayload);
    this.scrollToBottom();

    // console.log(this.messages);
    this.roomSer.sendMessage(payload).subscribe(res => {
      let data = res.data;
      let index = this.shareSer.sortedIndex(this.messages, data);
      let search = this.messages.findIndex(item => item.status == false);
      this.messages.splice(search, 1);
      if (index < 0) {
        this.messages.push(payload);
        this.socket.emit('message', { room: this.roomSer.currentRoom, data: payload })

      } else {
        this.messages.splice(index, 0, data);
        this.socket.emit('message', { room: this.roomSer.currentRoom, data: data })

      }
      this.scrollToBottom();
    });

  }
  openImageDialog(data: any) {
    let config = {
      panelClass: 'custom-modalbox',
      data: data,
    }
    const dialogRef = this.dialog.open(ImageDialogComponent, config);
  }
  sendMessage() {
    let payload = {} as messages;
    payload = {
      room: this.roomSer.currentRoom,
      text: this.text.trim(),
      user: this.authSer.user,
      status: false
    }
    if (payload.text?.length !== 0) {
      let fakepayload = payload;
      if (this.checkLengthReply() != 0) {
        fakepayload = {
          ...payload,
          reply: this.reply
        }
        payload = {
          ...payload,
          reply: this.reply._id
        }
        this.reply = {};
      }
      this.messages.push(fakepayload);
      this.scrollToBottom();
      this.text = '';
      this.roomSer.sendMessage(payload).subscribe(res => {
        let data = res.data;
        let index = this.shareSer.sortedIndex(this.messages, data);
        let search = this.messages.findIndex(item => item.status == false);
        this.messages.splice(search, 1);
        if (index < 0) {
          this.messages.push(payload);
          this.socket.emit('message', { room: this.roomSer.currentRoom, data: payload })

        } else {
          this.messages.splice(index, 0, data);
          this.socket.emit('message', { room: this.roomSer.currentRoom, data: data })

        }
        this.scrollToBottom();
      });
    }
  }
}
