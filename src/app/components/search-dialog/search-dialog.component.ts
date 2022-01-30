import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { mergeMap, filter, catchError, take, toArray } from 'rxjs/operators'
import { WebsocketService } from 'src/app/services/websocket.service';
import { iif } from 'rxjs';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  constructor(
    private socket: WebsocketService,
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authSer: AuthService,
    private shareSer:ShareService
  ) { }
  result: any;
  email: string = '';
  public _id: any = this.data._id;
  public userData: any = this.data.data;
  ngOnInit(): void {
    this.get();
  }

  get() {
    this.socket.on('renderF').subscribe(() => {
      this.dialogRef.close();
    })
  }
  async sendFriend(_id: string, user: any) {
    let temp = {
      from: this._id,
      to: _id
    }
    this.authSer.checkSendReq(temp).pipe(
      filter(data => data.count == 0),
      mergeMap((data: any) => {
        return this.authSer.sendFriendReq(temp);
      }),
      toArray(),
    ).subscribe(data => {
      if (data.length == 0) {
        this.shareSer.openSnackBar(`already send friend request to ${user.displayName}`,false);
      } else if (data.length > 0) {
        this.shareSer.openSnackBar(`send friend request to ${user.displayName}`);
        this.socket.emit("touch", user.uid);
      }
    })
  }

  async updateMesssages() {
    let keyword = this.email;
    keyword = keyword.trim();
    if (keyword.length > 1) {
      let data = await this.authSer.searchUser(keyword).toPromise();
      this.result = data.result;
    }
  }

}
