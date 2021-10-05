import { MyTask } from "./myTask";

export interface EntityBase {
    add(listName: string, item: MyTask): void;
    remove(list: MyTask[], item: MyTask): void;
    getList(name: string): MyTask[];
}