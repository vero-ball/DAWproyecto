import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTruncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }

}
