import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform{
  transform(text: string, maxWords: number):string {
    let words = text.split(/\s+/);
    let truncate = words.slice(0, maxWords).join(' ');
     return truncate + '...'
  }
}
