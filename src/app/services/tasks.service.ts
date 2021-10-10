import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { arrayHelper } from '../helper/arrayHelper';
import { EntityBase } from '../interfaces/entityBase';
import { MyTask } from '../interfaces/myTask';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements EntityBase {

  list: Record<string, Partial<any[]>> = {};

  constructor() { }

  add(listName: string, task: MyTask): boolean {

    if (task.TaskName) {
      task.Order = this.list[listName].length > 0 ? Math.max(... this.list[listName].map(x => { return x.Order })) + 1 : 1;
      this.list[listName].push(task);
      return true;
    }
    return false;
  }
  remove(listName: string, task: MyTask): boolean {

    let bakpList: any[] = arrayHelper.clone(this.list[listName]);

    this.list[listName].forEach((value, index) => {
      if (value.Order === task.Order) {
        this.list[listName].splice(index, 1);
      }
    });
    return (bakpList !== this.list[listName]);
  }
  get(listName: string): Observable<MyTask[]> {

    if (this.list[listName] == undefined) {
      this.list[listName] = [];
    }
    return of(this.list[listName]);
  }
  rename(listName: string, task: MyTask) {

    //let tempList: MyTask[] = [];
    this.get(listName).subscribe(t => this.list[listName] = t)

    this.list[listName].some(element => {
      if (element.Order == task.Order) {
        element.TaskName = task.TaskName
      }
    });
  }
}
;