import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multipleSearchFilter'
})
export class MultipleSearchFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
