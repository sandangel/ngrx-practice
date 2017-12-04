import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import {switchMap, map, catchError} from 'rxjs/operators';
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
            map(pizza => new pizzaActions.CreatePizzasSuccess(pizza)),
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
            map(pizza => new pizzaActions.UpdatePizzasSuccess(pizza)),
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
            map(() => new pizzaActions.RemovePizzasSuccess(pizza)),
            catchError(error => of(new pizzaActions.RemovePizzasFail(error))),
          ),
      ),
    );
}
