import { Observable, Subscriber, Subscription } from 'rxjs';
import { BoolFilterPipe } from '../pipes/bool-filter.pipe';
export interface EntityBase<Type> {
  add(item: Type): Observable<boolean>;
  remove(item: Type): Observable<any>;
  update(item: Type): Observable<boolean>;
  get(): Observable<Type[]>;
  getById(): Observable<Type>;
}
