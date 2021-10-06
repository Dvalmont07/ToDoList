import { Injectable } from '@angular/core';
import { EntityBase } from '../interfaces/entityBase';
import { MyTask } from '../interfaces/myTask';
import { DONETASKSLIST, TODOTASKSLIST } from './mocks/TasksList';



@Injectable({
  providedIn: 'root'
})
export class TasksService implements EntityBase {

  list: Record<string, Partial<any[]>> = {};

  constructor() { }
  add(listName: string, task: MyTask): boolean {

    task.Order = this.getList(listName).length > 0 ? Math.max(...this.getList(listName).map(x => { return x.Order })) + 1 : 1;
    if (task.TaskName) {
      this.getList(listName).push(task);
      return true;
    }
    return false;
  }
  remove(listName: string, task: any): void {

    this.list[listName] = this.getList(listName).filter(t => {
      return t.Order != task.Order;
    });

    console.log(this.getList(listName));

    this.getList(listName);
  }
  getList(listName: string): MyTask[] {

    if (this.list[listName] == undefined) {
      this.list[listName] = [];
    }
    return this.list[listName];
  }


  // getToDoTaskList(): MyTask[] {
  //   return TODOTASKSLIST;
  // }
  // getDoneTaskList(): MyTask[] {
  //   return DONETASKSLIST;
  // }
}
