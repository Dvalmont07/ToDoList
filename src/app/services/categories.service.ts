import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { ICategory } from '../interfaces/iCategory';
import { IBaseMethods } from '../interfaces/iBaseMethods';
import { CATEGORRIES } from './mocks/Categories';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements IBaseMethods<ICategory> {
  ICategoryList: ICategory[] = [];

  constructor() { }
  getById(): Observable<ICategory> {
    throw new Error('Method not implemented.');
  }
  add(item: ICategory): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  remove(item: ICategory): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  update(item: ICategory): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  get(): Observable<ICategory[]> {
    return of((this.ICategoryList = CATEGORRIES));
  }
}
