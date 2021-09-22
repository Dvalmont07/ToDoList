import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    console.log("items", items);

    if (!items) { return []; }
    if (searchText == "") { return items; }

    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return item.TaskName.toLocaleLowerCase().includes(searchText);
    });
  }

}
