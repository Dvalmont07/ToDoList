import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityBase } from '../interfaces/entityBase';
import { MyTask } from '../interfaces/myTask';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements EntityBase {
  constructor() {}
  add(item: any): void {
    throw new Error('Method not implemented.');
  }
  remove(item: any): void {
    throw new Error('Method not implemented.');
  }
  update(item: any): boolean {
    throw new Error('Method not implemented.');
  }
  get(): Observable<any[]> {
    throw new Error('Method not implemented.');
  }
}
