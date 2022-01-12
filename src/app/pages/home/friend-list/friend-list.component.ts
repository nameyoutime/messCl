import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  @Input() list:any;
  constructor() { }

  ngOnInit(): void {
  }
  joinChat(room:string){
    console.log(room);
  }
}
