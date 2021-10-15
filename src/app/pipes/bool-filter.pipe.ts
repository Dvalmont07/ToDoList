import { Pipe, PipeTransform } from '@angular/core';
import { arrayHelper } from '../helper/arrayHelper';

@Pipe({
  name: 'boolFilter',
})
export class BoolFilterPipe implements PipeTransform {
  transform(items: any[], fields: any[], boolValue: boolean): any {
    if (!items) {
      return items;
    }
    if (!fields) {
      return items;
    }
    if (boolValue == null) {
      return items;
    }

    console.log('items',items);
    console.log('fields',fields);
    console.log('boolValue',boolValue);


    let tempList = [];
    let finalItemsList: any[] = [];

    for (let i = 0; i < fields.length; i++) {
      tempList.push(
        items.filter((item) => {
          if (item && item[fields[i]] !== undefined) {
            return item[fields[i]]== boolValue;
          } else {
            return false;
          }
        })
      );
    }

    return finalItemsList = arrayHelper.concatList(tempList, finalItemsList);
  }
}
