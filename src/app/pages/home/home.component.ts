import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public uid: string = '';
  public data: any;
  public loadData: boolean = false;
  public room: any = null;
  constructor(private shareSer:ShareService,private authSer: AuthService, private afAuth: AngularFireAuth, private roomSer: RoomService) {
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
  }
  joinRoom(value: any) {
    // this.room = value;
    this.roomSer.setCurrentRoom(value);
    // console.log(value);

  }
  doClick(){
    this.shareSer.setMenu();
  }

  ngOnInit(): void {
  }

}
