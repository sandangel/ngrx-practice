import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import * as fromRoot from '../../../app/store';
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
    .ofType<pizzaActions.CreatePizza>(pizzaActions.CREATE_PIZZA)
    .pipe(
      map(action => action.payload),
      switchMap(pizza =>
        this.pizzaService
          .createPizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.CreatePizzaFail(error))),
          ),
      ),
    );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType<pizzaActions.CreatePizzaSuccess>(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map(action => action.payload),
      map(pizza => new fromRoot.Go({path: ['/products', pizza.id]})),
    );

  @Effect()
  updatePizza$ = this.actions$
    .ofType<pizzaActions.UpdatePizza>(pizzaActions.UPDATE_PIZZA)
    .pipe(
      map(action => action.payload),
      switchMap(pizza =>
        this.pizzaService
          .updatePizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.UpdatePizzaFail(error))),
          ),
      ),
    );

  @Effect()
  removePizza$ = this.actions$
    .ofType<pizzaActions.RemovePizza>(pizzaActions.REMOVE_PIZZA)
    .pipe(
      map(action => action.payload),
      switchMap(pizza =>
        this.pizzaService
          .removePizza(pizza)
          .pipe(
            map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.RemovePizzaFail(error))),
          ),
      ),
    );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(pizzaActions.UPDATE_PIZZA_SUCCESS, pizzaActions.REMOVE_PIZZA_SUCCESS)
    .pipe(map(pizza => new fromRoot.Go({path: ['/products']})));
}
