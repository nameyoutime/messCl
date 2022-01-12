import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-friend-req-dialog',
  templateUrl: './friend-req-dialog.component.html',
  styleUrls: ['./friend-req-dialog.component.scss']
})
export class FriendReqDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<FriendReqDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authSer: AuthService
  ) { }

  public req: any = this.data.req;
  public _id: any = this.data._id;

  ngOnInit(): void {
  }
  denied(_id: string,index:number) {
    let temp = {
      currId: this._id,
      _id: _id
    }
    
    
    // delete this.req[index];
    // let resut = temp1.slice(3,1)
    this.req.splice(index, 1)

    // console.log(temp1);
    this.authSer.deniedReq(temp).subscribe((data: any) => {
      console.log(data);
    })
  }
  accept(_id: string,index:number) {
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
        this.denied(_id,index);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
    })
  }

}
