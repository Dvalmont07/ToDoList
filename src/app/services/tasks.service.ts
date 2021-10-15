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

  taskList: any[] = [];
  // list: Record<string, Partial<any[]>> = {};

  constructor() { }
  update(task: MyTask): boolean {
    let bakpList: any[] = arrayHelper.clone(this.taskList);

    console.log('bakpList',bakpList);

    this.taskList.forEach((value, index) => {
      if (value.Order === task.Order) {
        value.Done = task.Done;
      }
    });
    sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);

    console.log('this.taskList',this.taskList);

    return (bakpList !== this.taskList);
  }

  add(task: MyTask): boolean {
        if (task.TaskName) {
      task.Order = this.taskList.length > 0 ? Math.max(... this.taskList.map(x => { return x.Order })) + 1 : 1;
      this.taskList.push(task);
      sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);
      return true;
    }
    return false;
  }
  remove(task: MyTask): boolean {

    let bakpList: any[] = arrayHelper.clone(this.taskList);

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
      this.taskList = [];
    }

    return of(this.taskList);
  }

  rename(task: MyTask) {

    this.taskList.some(element => {
      if (element.Order == task.Order) {
        element.TaskName = task.TaskName
      }
    });

    sessionStorage['taskList'] = arrayHelper.saveToSession(this.taskList);
  }
  moveItemInArray(taskList: any[], event: any) {

    //FIXME
    moveItemInArray(taskList, event.previousIndex, event.currentIndex);
    sessionStorage['taskList'] = arrayHelper.saveToSession(taskList);
  }
}
