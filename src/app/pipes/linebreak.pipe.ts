import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreak'
})
export class LinebreakPipe implements PipeTransform {

  transform(data: any) {
    return this.change(data.input, data.breakpoint);
  }
  change(a: any, limit: any) {
    // console.log(a);
    if (a == undefined) {
      return "text not found";
    }
    for (var i = 0; i < a.length; i++) {
      if (i % (limit + 1) === 0 && i > 0) {
        a = [a.slice(0, i), '\n', a.slice(i)].join('');
      }
    }
    return a;
  }

}
