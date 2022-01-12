import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-friendreq',
  templateUrl: './friendreq.component.html',
  styleUrls: ['./friendreq.component.scss']
})
export class FriendreqComponent implements OnInit {
  @Input() req: any;
  @Input() _id: any;


  constructor(private authSer: AuthService) { }

  ngOnInit(): void {
    // console.log(this.req);
    // console.log(this._id_id);
  }

  denied(_id: string) {
    let temp = {
      currId: this._id,
      _id: _id
    }
    this.authSer.deniedReq(temp).subscribe((data: any) => {
      console.log(data);
    })

  }

  accept(_id: string) {
    let temp = {
      user: [
        this._id, _id
      ],
      message: []
    }

    this.authSer.createRoom(temp).subscribe(data => {
      let temp1 = {
        from: this._id,
        to: _id,
        room: data.data._id
      }
  
      this.authSer.acceptReq(temp1).subscribe((data: any) => {
        console.log(data);
        this.denied(_id);
      })
      
    })

  }


}
