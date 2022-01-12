import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() _id:any;
  email: string = '';
  constructor(private authSer: AuthService) { }
  result: any;
  ngOnInit(): void {
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

  async sendFriend(_id:string){
    let temp = {
      from:this._id,
      to:_id
    }
    
    await this.authSer.sendFriendReq(temp).toPromise();

  }

}
