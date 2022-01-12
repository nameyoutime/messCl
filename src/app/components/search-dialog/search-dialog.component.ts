import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  constructor(
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
  checkFriend(val:any){
    console.log(val);
    return 0;
  }
  async sendFriend(_id: string) {
    let temp = {
      from: this._id,
      to: _id
    }
    console.log(temp);
    await this.authSer.sendFriendReq(temp).toPromise();
  }

  test(val:any){
    console.log(val);
    
  }
  async updateMesssages() {
    if (this.email.length > 1) {
      let data = await this.authSer.searchUser(this.email).toPromise();
      this.result = data.result;
      // this.authSer.searchUser(this.email).subscribe((data:any) => {
      //   this.result = data.result;
      // });
      this.email = '';
    }
  }

}
