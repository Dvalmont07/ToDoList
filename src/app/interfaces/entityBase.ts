import { Observable } from "rxjs";
import { MyTask } from "./myTask";

export interface EntityBase {
    add(listName: string, tassk: MyTask): void;
    remove(listName: string, task: MyTask): void;
    get(name: string): Observable<MyTask[]>;
}