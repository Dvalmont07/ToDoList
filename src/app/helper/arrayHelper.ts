export class arrayHelper {

    public static clone(originalArray: any[]): any[] {
        let newArray: any[] = [];

        originalArray.forEach((value, index) => {
            newArray[index] = value;
        });
        return newArray;
    }
    public static saveToSession(list: any[]) {
        return JSON.stringify(list);
    }
    public static getFromSession(json: string) {
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

}
