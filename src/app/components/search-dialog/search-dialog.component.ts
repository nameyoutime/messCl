import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { mergeMap, filter, catchError, take, toArray } from 'rxjs/operators'
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  constructor(
    private socket:WebsocketService,
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authSer: AuthService
  ) { }
  result: any;
  email: string = '';
  public _id: any = this.data._id;
  public userData: any = this.data.data;
  ngOnInit(): void {
  }
  sendFriend(_id: string,user:any) {
    let temp = {
      from: this._id,
      to: _id
    }
    // console.log(temp);
    this.authSer.checkSendReq(temp).pipe(
      filter(data => data.count == 0),
      mergeMap((data: any) => {
        return this.authSer.sendFriendReq(temp);
      }),
      toArray(),
    ).subscribe(data => {
      if(data.length==0){
        alert(`already send friend request to ${user.displayName}`);
      }else if(data.length>0){
        alert(`send friend request to ${user.displayName}`);
        this.socket.emit("touch",user.uid);
      }
    })
    // await this.authSer.sendFriendReq(temp).toPromise();
  }

  async updateMesssages() {
    let keyword = this.email;
    keyword = keyword.trim();
    if (keyword.length > 1) {
      let data = await this.authSer.searchUser(keyword).toPromise();
      this.result = data.result;
      // this.authSer.searchUser(this.email).subscribe((data:any) => {
      //   this.result = data.result;
      // });
      this.email = '';
    }
  }

}
