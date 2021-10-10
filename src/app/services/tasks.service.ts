import { moveItemInArray } from '@angular/cdk/drag-drop';
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
      sessionStorage[listName] = arrayHelper.saveToSession(this.list[listName]);
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
    sessionStorage[listName] = arrayHelper.saveToSession(this.list[listName]);
    return (bakpList !== this.list[listName]);
  }
  get(listName: string): Observable<MyTask[]> {

    if (sessionStorage[listName]) {
      this.list[listName] = arrayHelper.getFromSession(sessionStorage[listName]);
    } else {
      this.list[listName] = [];
    }
    return of(this.list[listName]);
  }
  rename(listName: string, task: MyTask) {

    this.list[listName].some(element => {
      if (element.Order == task.Order) {
        element.TaskName = task.TaskName
      }
    });

    sessionStorage[listName] = arrayHelper.saveToSession(this.list[listName]);
  }
  moveItemInArray(list: any[], event: any, listName: string) {

    moveItemInArray(list, event.previousIndex, event.currentIndex);
    sessionStorage[listName] = arrayHelper.saveToSession(list);
  }
}