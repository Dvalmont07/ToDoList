import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: "multipleSearchFilter",
  pure: false
})
export class MultipleSearchFilterPipe implements PipeTransform {
  transform(items: any[], fields: any[], searchText: string): any {

    if (!items) { return items; }
    if (!fields) { return items; }
    if (searchText == "") { return items; }

    let tempList = [];
    let finalItemsList: any[] = [];

    for (let i = 0; i < fields.length; i++) {
      tempList.push(
        items.filter((item) => {
          if (item && item[fields[i]] !== undefined) {
            return item[fields[i]].toLowerCase().includes(searchText.toLowerCase());
          } else {
            return false;
          }
        })
      );
    }

    return finalItemsList = this.concatList(tempList, finalItemsList);

  }

  private concatList(tempList: any[][], finalItemsList: any[]) {
    tempList.forEach(item => {
      if (item.length > 0) {
        finalItemsList = finalItemsList.concat(item);
      }
    });
    return finalItemsList;
  }
}
