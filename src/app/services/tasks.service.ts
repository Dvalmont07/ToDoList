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

    if (task.TaskName) {
      task.Order = this.getList(listName).length > 0 ? Math.max(...this.getList(listName).map(x => { return x.Order })) + 1 : 1;
      this.getList(listName).push(task);
      return true;
    }
    return false;
  }
  remove(listName: string, task: any): boolean {

    let bakpList = this.list[listName];

    this.list[listName] = this.getList(listName).filter(t => {
      return t.Order != task.Order;
    });

    return bakpList !== this.list[listName];

  }
  getList(listName: string): MyTask[] {

    if (this.list[listName] == undefined) {
      this.list[listName] = [];
    }
    return this.list[listName];
  }

  rename(listName: string, task: any) {

    for (let i = 0; i < this.getList(listName).length; i++) {
      if (this.getList(listName)[i].Order == task.Order) {
        this.getList(listName)[i].TaskName = task.TaskName;
      }
    }
  }

}


