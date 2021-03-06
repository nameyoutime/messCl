import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { ShareService } from 'src/app/services/share.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { WebsocketService } from 'src/app/services/websocket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('widthGrowM', [
      state(
        'closed',
        style({

          transform: 'translate3d(0,0,0)',


          // height: 0,
        })
      ),
      state(
        'open',

        style({

          transform: 'translate3d(-100%,0,0)',

          width: '0%',
          // height: '100%',
        })
      ),
      // transition('* => *', animate(150)),
      transition('closed => open', animate('400ms ease-in-out')),
      transition('open => closed', animate('400ms ease-in-out')),
    ]),
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
          width: '25vw',
          // height: '100%',
        })
      ),
      // transition('* => *', animate(150)),
      transition('closed => open', animate('400ms ease-in-out')),
      transition('open => closed', animate('400ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  public uid: string = '';
  public data: any;
  public loadData: boolean = false;
  public room: any = null;
  public innerWidth: any;
  public isMoblie: boolean = false;
  public selected: any = '';
  constructor(private socket: WebsocketService, public shareSer: ShareService, private authSer: AuthService, private afAuth: AngularFireAuth, private roomSer: RoomService) {
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        localStorage.setItem('uid', user.uid);
        this.uid = user.uid;
        this.authSer.getUser(this.uid).subscribe(data => {
          this.data = data.data[0];
          this.loadData = true;
        })
      } else {
        localStorage.removeItem('uid');
      }
    })
    this.authSer.updatedUser.subscribe(() => {
      this.authSer.getUser(this.uid).subscribe(data => {
        this.data = data.data[0];
      })
    })
    socket.on('render').subscribe(() => {
      this.authSer.getUser(this.uid).subscribe(data => {
        this.data = data.data[0];
      })
    })
  }
  joinRoom(value: any) {
    this.selected = value;
    this.roomSer.setCurrentRoom(value);
  }


  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 425) {
      this.isMoblie = true;
    } else {
      this.isMoblie = false;

    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 425) {
      this.isMoblie = true;
    } else {
      this.isMoblie = false;
    }
  }
  logout(){
    this.authSer.logout().then(()=>{
      this.shareSer.openSnackBar("Logout success!");
    })
  }
}
