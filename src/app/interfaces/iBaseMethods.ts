import { Observable } from 'rxjs';

export interface IBaseMethods<Type> {
  add(item: Type): Observable<boolean>;
  remove(item: Type): Observable<any>;
  update(item: Type): Observable<boolean>;
  get(): Observable<Type[]>;
  getById(): Observable<Type>;
}
