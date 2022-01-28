import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDate'
})
export class GetDatePipe implements PipeTransform {

  transform(value: any): unknown {
    let temp:any = value;
    let date = this.getDate(temp);
    return date;
  }
  formatDate(val: number, minLength: number) {
    let result = (val).toString();
    result = result.padStart(minLength, '0');
    return result;
  }
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
  

}
