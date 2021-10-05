import { Injectable } from '@angular/core';
import { EntityBase } from '../interfaces/entityBase';
import { MyTask } from '../interfaces/myTask';
import { DONETASKSLIST, TODOTASKSLIST } from './mocks/TasksList';



@Injectable({
  providedIn: 'root'
})
export class TasksService implements EntityBase {

  constructor() { }
  add(listName: string, task: MyTask): boolean {

    let taskList = this.getList(listName);

    task.Order = taskList.length > 0 ? Math.max(...taskList.map(x => { return x.Order })) + 1 : 1;
    if (task.TaskName) {
      taskList.push(task);
      return true;
    }
    return false;
  }
  remove(list: any[], item: any): void {
    throw new Error('Method not implemented.');
  }
  getList(listName: string): MyTask[] {
    if (sessionStorage[listName]) {
      return sessionStorage[listName];
    } else {
      return sessionStorage[listName] = [];
    }
  }


  getToDoTaskList(): MyTask[] {
    return TODOTASKSLIST;
  }
  getDoneTaskList(): MyTask[] {
    return DONETASKSLIST;
  }
}
