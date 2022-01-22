import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreak'
})
export class LinebreakPipe implements PipeTransform {


  transform(data: any) {
    // console.log(data);

    return this.change(data.input, data.breakpoint);
  }
  change(a: any, limit: any) {
    // let text = (a as HTMLTextAreaElement);
    // console.log(text);
    for (var i = 0; i < a.length; i++) {
      // console.log(a[i]);
      if (i % (limit + 1) === 0 && i > 0) {
        a = [a.slice(0, i), '\n', a.slice(i)].join('');
      }
    }
    return a;
  }

}
