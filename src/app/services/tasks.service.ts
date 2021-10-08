import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EntityBase } from '../interfaces/entityBase';
import { MyTask } from '../interfaces/myTask';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements EntityBase {

  list: Record<string, Partial<any[]>> = {};

  constructor() { }

  add(listName: string, task: MyTask): boolean {

    let tempList: MyTask[] = [];

    this.getList(listName).subscribe(t => tempList = t);

    if (task.TaskName) {
      task.Order = tempList.length > 0 ? Math.max(...tempList.map(x => { return x.Order })) + 1 : 1;
      tempList.push(task);
      return true;
    }
    return false;
  }
  remove(listName: string, task: any): boolean {

    let bakpList = this.list[listName];
    let tempList: MyTask[] = [];

    this.getList(listName).subscribe(t => tempList = t);

    this.list[listName] = tempList.filter(t => {
      return t.Order != task.Order;
    });

    return bakpList !== this.list[listName];

  }
  getList(listName: string): Observable<MyTask[]> {

    if (this.list[listName] == undefined) {
      this.list[listName] = [];
    }
    return of(this.list[listName]);
  }
  rename(listName: string, task: any) {


    let tempList: MyTask[] = [];
    this.getList(listName).subscribe(t => tempList = t)

    tempList.some(element => {
      if (element.Order == task.Order) {
        element.TaskName = task.TaskName
      }
    });
  }

}