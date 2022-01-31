import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSer: AuthService, private router: Router, private shareSer: ShareService) { }

  ngOnInit(): void {
  }
  login() {
    this.authSer.loginWithGoogle().then(() => {
      this.shareSer.openSnackBar("Login success!");
    });
    // console.log(result);
  }

}
