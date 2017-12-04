import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import * as fromRoot from '../../../app/store';
import {switchMap, map, catchError, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$
    .ofType<pizzaActions.LoadPizzas>(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() =>
        this.pizzaService
          .getPizzas()
          .pipe(
            map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
            catchError(error => of(new pizzaActions.LoadPizzasFail(error))),
          ),
      ),
    );

  @Effect()
  createPizza$ = this.actions$
    .ofType<pizzaActions.CreatePizzas>(pizzaActions.CREATE_PIZZAS)
    .pipe(
      map(action => action.payload),
      switchMap(pizza =>
        this.pizzaService
          .createPizza(pizza)
          .pipe(
            mergeMap(pizza => [
              new pizzaActions.CreatePizzasSuccess(pizza),
              new fromRoot.Go({path: ['/products', pizza.id]}),
            ]),
            catchError(error => of(new pizzaActions.CreatePizzasFail(error))),
          ),
      ),
    );

  @Effect()
  updatePizza$ = this.actions$
    .ofType<pizzaActions.UpdatePizzas>(pizzaActions.UPDATE_PIZZAS)
    .pipe(
      map(action => action.payload),
      switchMap(pizza =>
        this.pizzaService
          .updatePizza(pizza)
          .pipe(
            mergeMap(pizza => [
              new pizzaActions.UpdatePizzasSuccess(pizza),
              new fromRoot.Go({path: ['/products']}),
            ]),
            catchError(error => of(new pizzaActions.UpdatePizzasFail(error))),
          ),
      ),
    );

  @Effect()
  removePizza$ = this.actions$
    .ofType<pizzaActions.RemovePizzas>(pizzaActions.REMOVE_PIZZAS)
    .pipe(
      map(action => action.payload),
      switchMap(pizza =>
        this.pizzaService
          .removePizza(pizza)
          .pipe(
            mergeMap(() => [
              new pizzaActions.RemovePizzasSuccess(pizza),
              new fromRoot.Go({path: ['/products']}),
            ]),
            catchError(error => of(new pizzaActions.RemovePizzasFail(error))),
          ),
      ),
    );
}
