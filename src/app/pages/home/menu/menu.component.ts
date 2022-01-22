import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() isMoblie: any;

  constructor(private shareSer:ShareService) { }

  ngOnInit(): void {
  }
  doClick(){
    if(this.isMoblie){
      console.log("open friend list");
      this.shareSer.setMenuMoblie();
    }else{
      this.shareSer.setMenu();
    }
  }
}
