export class arrayHelper {

    public static clone(originalArray: any[]): any[] {
        let newArray: any[] = [];

        originalArray.forEach((value, index) => {
            newArray[index] = value;
        });
        return newArray;
    }

}