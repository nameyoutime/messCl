import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FriendReqDialogComponent } from 'src/app/components/friend-req-dialog/friend-req-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-friendreq',
  templateUrl: './friendreq.component.html',
  styleUrls: ['./friendreq.component.scss']
})
export class FriendreqComponent implements OnInit {
  @Input() req: any;
  @Input() _id: any;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    let config = {
      width: '250px',
      data: { req: this.req, _id: this._id },
    }
    const dialogRef = this.dialog.open(FriendReqDialogComponent, config);
  }

}
