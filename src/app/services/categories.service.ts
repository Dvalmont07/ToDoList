import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Category } from '../interfaces/category';
import { EntityBase } from '../interfaces/entityBase';
import { CATEGORRIES } from './mocks/Categories';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements EntityBase<Category> {
  categoryList: Category[] = [];

  constructor() { }
  getById(): Observable<Category> {
    throw new Error('Method not implemented.');
  }
  add(item: Category): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  remove(item: Category): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  update(item: Category): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  get(): Observable<Category[]> {
    return of((this.categoryList = CATEGORRIES));
  }
}
