import { Injectable } from '@angular/core';
import { MyTask } from '../interfaces/myTask';
import { DONETASKSLIST, TODOTASKSLIST } from './mocks/TaskSList';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  getToDoTaskList(): MyTask[] {
    return TODOTASKSLIST;
  }
  getDoneTaskList(): MyTask[] {
    return DONETASKSLIST;
  }
}
