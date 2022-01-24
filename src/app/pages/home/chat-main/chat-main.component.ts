import { AfterViewChecked, Component, HostListener, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { messages } from 'src/app/models/messages.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { ShareService } from 'src/app/services/share.service';
import { DataUrl, DOC_ORIENTATION, NgxImageCompressService, UploadResponse, } from 'ngx-image-compress';
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';


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
  uid: any = localStorage.getItem("uid");
  constructor(private dialog: MatDialog, private imageCompress: NgxImageCompressService, public roomSer: RoomService, public authSer: AuthService, public shareSer: ShareService) { }

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
  replyClick(value: any) {
    this.reply = value;
  }
  addEmoji(event: any) {
    this.text = `${this.text}${event.emoji.native}`
  }
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  checkImgAndReply(re: boolean = false, img: boolean = false) {
    let temp = Object.keys(this.reply).length;
    console.log(temp);
    if (temp > 0) {
      return "10%";
    } else if (temp === 0) {
      return "50px";
    }
    // if(this.reply!==null);
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

  async joinRoom(value: any) {
    this.loading = false;
    this.addMore = false;
    this.count = 0;
    this.user = this.authSer.user;
    if (value !== null && !this.addMore) {
      this.roomSer.join(value);
      this.roomSer.getRoom(value, this.count).subscribe((dataRoom: any) => {
        let arr = dataRoom.data;
        this.messages = [];
        for (let i = 0; i < arr.length; i++) {
          this.messages.push(arr[arr.length - i - 1]);
        }
        this.loading = true;
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
          let test = this.imageCompress.byteCount(result);
          // console.warn(
          //   'Size in kbs is now:',
          //   test/1000
          // );  
          if (test >= this.maxImgSizeValue) {
            alert("file is larger than " + this.maxImgSizeValue / 1000 + "kb");
          } else {
            // console.log(result);
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
    this.roomSer.getRoom(this.room, this.count).subscribe((data: any) => {
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
    // console.log(this.messages);
    this.roomSer.sendMessage(payload).subscribe(res => {
      let data = res.data;
      let index = this.shareSer.sortedIndex(this.messages, data);
      let search = this.messages.findIndex(item => item.status == false);
      this.messages.splice(search, 1);
      if (index < 0) {
        this.messages.push(payload);
      } else {
        this.messages.splice(index, 0, data);
      }
      // console.log(this.messages);
    });

  }
  openImageDialog(data: any) {
    let config = {
      height: 'auto',
      width: 'auto',
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
      this.text = '';
      this.roomSer.sendMessage(payload).subscribe(res => {
        let data = res.data;
        let index = this.shareSer.sortedIndex(this.messages, data);
        let search = this.messages.findIndex(item => item.status == false);
        this.messages.splice(search, 1);
        if (index < 0) {
          this.messages.push(payload);
        } else {
          this.messages.splice(index, 0, data);
        }
      });
    }
  }
}
