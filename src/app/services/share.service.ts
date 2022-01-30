import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public menu: boolean = true;
  public menuUpdated: EventEmitter<any> = new EventEmitter();
  public menuMoblie: boolean = true;
  public menuMoblieUpdated: EventEmitter<any> = new EventEmitter();
  public isMoblie: boolean = false;
  public darkMode: boolean = true;
  private defautlSnackBarConfig: MatSnackBarConfig =
    {
      horizontalPosition: 'end', verticalPosition: 'top',
      duration: 1 * 1000,
      panelClass: ['white-snackbar']
    };
  private defaultSnackBarAction: string = "close";
  constructor(private snackBar: MatSnackBar) {

  }

  setMenu() {
    this.menu = !this.menu;
    this.menuUpdated.emit(this.menu);
  }
  setMenuMoblie() {
    this.menuMoblie = !this.menuMoblie;
    this.menuMoblieUpdated.emit(this.menuMoblie);
  }
  formatDate(val: number, minLength: number) {
    let result = (val).toString();
    result = result.padStart(minLength, '0');
    return result;
  }
  //Date month year
  getDate(value: number) {
    let date = new Date(value);
    let year = this.formatDate(date.getFullYear(), 4);
    let month;
    if (date.getMonth() == 12) {
      month = this.formatDate(date.getMonth(), 2);
    } else {
      month = this.formatDate(date.getMonth() + 1, 2);
    }
    let day = this.formatDate(date.getDate(), 2);
    let hour = this.formatDate(date.getHours(), 2);
    let min = this.formatDate(date.getMinutes(), 2);
    let MDY = month + '-' + day + '-' + year;
    let HM = hour + ':' + min;
    let result = MDY + " " + HM;
    return result;
  }
  sortedIndex(array: Array<any>, value: any) {
    let low = 0,
      high = array.length;

    while (low < high) {
      let mid = low + high >>> 1;
      if (array[mid].date < value.date) low = mid + 1;
      else high = mid;
    }
    return low;
  }
  openSnackBar(message: string, isSuscess: boolean = true, action = this.defaultSnackBarAction, config: MatSnackBarConfig = this.defautlSnackBarConfig) {
    if(!isSuscess){
      this.defautlSnackBarConfig.panelClass = ['red-snackbar'];
    }
    this.snackBar.open(message, action, config);
  }


}
