import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-friend-req-dialog',
  templateUrl: './friend-req-dialog.component.html',
  styleUrls: ['./friend-req-dialog.component.scss']
})
export class FriendReqDialogComponent implements OnInit {

  constructor(private socket: WebsocketService,
    public dialogRef: MatDialogRef<FriendReqDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authSer: AuthService
  ) { }

  public req: any = this.data.req;
  public _id: any = this.data._id;

  ngOnInit(): void {
  }
  denied(_id: string, index: number, user: any) {
    let temp = {
      currId: this._id,
      _id: _id
    }

    this.req.splice(index, 1);
    this.authSer.deniedReq(temp).subscribe((data: any) => {
      // console.log(data);
      // this.authSer.updateUser();
      // this.socket.emit("touch", user.uid);
    })
  }
  async accept(_id: string, index: number, user: any) {
    let temp = {
      user: [
        this._id, _id
      ],
      message: []
    }
    let data = await this.authSer.createRoom(temp).toPromise();
    let temp1 = {
      from: this._id,
      to: _id,
      room: data.data._id
    }
    this.req.splice(index, 1);

    await this.authSer.acceptReq(temp1).toPromise();
    await this.authSer.deniedReq({
      currId: this._id,
      _id: _id
    }).toPromise();
    this.authSer.updateUser();
    this.socket.emit("touch", user.uid);
    this.socket.emit("acceptF", user.uid);
  }

}
