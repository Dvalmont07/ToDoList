import { Observable } from "rxjs";
import { MyTask } from "./myTask";

export interface EntityBase {
    add(tassk: MyTask): void;
    remove(task: MyTask): void;
    update(task: MyTask): boolean;
    get(): Observable<MyTask[]>;
}