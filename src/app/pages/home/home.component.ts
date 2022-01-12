import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public uid: string = '';
  public data: any;
  public loadData: boolean = false;
  constructor(public authSer: AuthService, private afAuth: AngularFireAuth) {
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

  ngOnInit(): void {
  }

}
