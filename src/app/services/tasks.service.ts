import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Observable, of, Subscriber, Subscription } from 'rxjs';
import { arrayHelper } from '../helper/arrayHelper';
import { IBaseMethods } from '../interfaces/iBaseMethods';
import { ITask } from '../interfaces/iTask';
import { TODOTASKSLIST } from './mocks/TasksList';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements IBaseMethods<ITask> {
  taskList: any[] = [];
  // list: Record<string, Partial<any[]>> = {};

  constructor() { }
  getById(): Observable<ITask> {
    throw new Error('Method not implemented.');
  }

  update(task: ITask): Observable<boolean> {
    let bakpList: any[] = arrayHelper.clone(this.taskList);
    sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);

    return of(bakpList !== this.taskList);
  }

  add(task: ITask): Observable<boolean> {
    if (task.TaskName) {
      task.Id = arrayHelper.getHighest(this.taskList, "Id");
      //task.Order = arrayHelper.getHighest(this.taskList, "Order"); //this.taskList.length > 0 ? Math.max(...this.taskList.map((x) => { return x.Order; })) + 1 : 1;
      this.taskList.push(task);
      sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);
      return of(true);
    }
    return of(false);
  }


  remove(task: ITask): any {
    let bakpList: any[] = arrayHelper.clone(this.taskList);
    let sub = new Observable();
    this.taskList.forEach((value, index) => {
      if (value.Id === task.Id) {
        this.taskList.splice(index, 1);
      }
    });
    sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);

    return (bakpList !== this.taskList);
  }
  get(): Observable<ITask[]> {
    if (sessionStorage['taskList']) {
      this.taskList = arrayHelper.getFromSession(sessionStorage['taskList']);
    } else {
      this.taskList = TODOTASKSLIST;
    }
    return of(this.taskList);
  }

  // edit(task: ITask) {
  //   this.taskList.some((element) => {
  //     if (element.Order == task.Order) {
  //       element.TaskName = task.TaskName;
  //     }
  //   });

  //   sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);
  // }
  moveItemInArray(taskList: any[], event: any) {
    let originalList = arrayHelper.clone(taskList);
    moveItemInArray(taskList, event.previousIndex, event.currentIndex);
    sessionStorage['taskList'] = arrayHelper.saveToSession(taskList);
  }
}
