import * as fromStore from '../store';

import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {tap, filter, take, switchMap, catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ToppingssGuard implements CanActivate {
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(switchMap(() => of(true)), catchError(() => of(false)));
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getToppingLoaded).pipe(
      tap(loaded => {
        if (!loaded) this.store.dispatch(new fromStore.LoadToppings());
      }),
      filter(loaded => loaded),
      take(1),
    );
  }

  constructor(private store: Store<fromStore.ProductsState>) {}
}
