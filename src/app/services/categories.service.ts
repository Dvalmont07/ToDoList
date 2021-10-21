import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityBase } from '../interfaces/entityBase';
import { MyTask } from '../interfaces/myTask';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements EntityBase {
  constructor() {}
  add(tassk: MyTask): void {
    throw new Error('Method not implemented.');
  }
  remove(task: MyTask): void {
    throw new Error('Method not implemented.');
  }
  update(task: MyTask): boolean {
    throw new Error('Method not implemented.');
  }
  get(): Observable<MyTask[]> {
    throw new Error('Method not implemented.');
  }
}
