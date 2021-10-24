import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Observable, of, Subscriber, Subscription } from 'rxjs';
import { arrayHelper } from '../helper/arrayHelper';
import { EntityBase } from '../interfaces/entityBase';
import { MyTask } from '../interfaces/myTask';
import { TODOTASKSLIST } from './mocks/TasksList';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements EntityBase<MyTask> {
  taskList: any[] = [];
  // list: Record<string, Partial<any[]>> = {};

  constructor() { }

  update(task: MyTask): Observable<boolean> {
    let bakpList: any[] = arrayHelper.clone(this.taskList);

    console.log('bakpList', bakpList);

    this.taskList.forEach((value, index) => {
      if (value.Order === task.Order) {
        value.Done = task.Done;
      }
    });
    sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);

    console.log('this.taskList', this.taskList);

    return of(bakpList !== this.taskList);
  }

  add(task: MyTask): Observable<boolean> {
    if (task.TaskName) {
      task.Order =
        this.taskList.length > 0
          ? Math.max(
            ...this.taskList.map((x) => {
              return x.Order;
            })
          ) + 1
          : 1;
      this.taskList.push(task);
      sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);
      return of(true);
    }
    return of(false);
  }
  remove(task: MyTask): any {
    let bakpList: any[] = arrayHelper.clone(this.taskList);
    let sub = new Observable();
    this.taskList.forEach((value, index) => {
      if (value.Order === task.Order) {
        this.taskList.splice(index, 1);
      }
    });
    sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);

    return (bakpList !== this.taskList);
  }
  get(): Observable<MyTask[]> {
    if (sessionStorage['taskList']) {
      this.taskList = arrayHelper.getFromSession(sessionStorage['taskList']);
    } else {
      this.taskList = TODOTASKSLIST;
    }
    return of(this.taskList);
  }

  rename(task: MyTask) {
    this.taskList.some((element) => {
      if (element.Order == task.Order) {
        element.TaskName = task.TaskName;
      }
    });

    sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);
  }
  moveItemInArray(taskList: any[], event: any) {
    moveItemInArray(taskList, event.previousIndex, event.currentIndex);
    sessionStorage['taskList'] = arrayHelper.saveToSession(taskList);
  }
}
