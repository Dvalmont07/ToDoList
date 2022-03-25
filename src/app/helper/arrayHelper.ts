export class arrayHelper {

  public static clone(originalArray: any[]): any[] {
    let newArray: any[] = [];

    originalArray.forEach((value, index) => {
      newArray[index] = value;
    });
    return newArray;
  }
  public static saveToJSON(list: any[]) {
    return JSON.stringify(list);
  }
  public static getFromJSON(json: string) {
    return JSON.parse(json);
  }

  public static concatList(tempList: any[][], finalItemsList: any[]) {
    tempList.forEach(item => {
      if (item.length > 0) {
        finalItemsList = finalItemsList.concat(item);
      }
    });
    return finalItemsList;
  }
  public static getHighest(list: any[], propertyName: string): number {
    return list.length > 0 ? Math.max(...list.map((x) => { return x[propertyName]; })) + 1 : 1;
  }

}
