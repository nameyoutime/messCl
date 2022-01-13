import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public menu: boolean = true;
  public menuUpdated: EventEmitter<any> = new EventEmitter();

  constructor() { }
  
  setMenu() {
    this.menu = !this.menu;
    this.menuUpdated.emit(this.menu);
    // console.log(this.menu);
  }
  formatDate(val:number,minLength:number) {
    let result = (val).toString();
    result = result.padStart(minLength,'0');
    return result;
  }
  //Date month year
  getDate(){
    let date = new Date();
    let year = this.formatDate(date.getFullYear(),4);
    let month;
    if(date.getMonth()==12){
      month = this.formatDate(date.getMonth(),2);
    }else{
      month = this.formatDate(date.getMonth()+1,2);
    }
    let day = this.formatDate(date.getDate(),2);
    let hour = this.formatDate(date.getHours(),2);
    let min = this.formatDate(date.getMinutes(),2);
    let MDY = month+'-'+day+'-'+year;
    let HM = hour+':'+min;
    let result = MDY+"T"+HM;
    return result;
  }
}
