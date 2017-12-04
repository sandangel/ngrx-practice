import {Action} from '@ngrx/store';
import {Pizza} from 'src/products/models/pizza.model';

export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}
export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}
export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export const CREATE_PIZZAS = '[Products] Create Pizzas';
export const CREATE_PIZZAS_FAIL = '[Products] Create Pizzas Fail';
export const CREATE_PIZZAS_SUCCESS = '[Products] Create Pizzas Success';

export class CreatePizzas implements Action {
  readonly type = CREATE_PIZZAS;
  constructor(public payload: Pizza) {}
}
export class CreatePizzasFail implements Action {
  readonly type = CREATE_PIZZAS_FAIL;
  constructor(public payload: any) {}
}
export class CreatePizzasSuccess implements Action {
  readonly type = CREATE_PIZZAS_SUCCESS;
  constructor(public payload: Pizza) {}
}

export const UPDATE_PIZZAS = '[Products] Update Pizzas';
export const UPDATE_PIZZAS_FAIL = '[Products] Update Pizzas Fail';
export const UPDATE_PIZZAS_SUCCESS = '[Products] Update Pizzas Success';

export class UpdatePizzas implements Action {
  readonly type = UPDATE_PIZZAS;
  constructor(public payload: Pizza) {}
}
export class UpdatePizzasFail implements Action {
  readonly type = UPDATE_PIZZAS_FAIL;
  constructor(public payload: any) {}
}
export class UpdatePizzasSuccess implements Action {
  readonly type = UPDATE_PIZZAS_SUCCESS;
  constructor(public payload: Pizza) {}
}

export const REMOVE_PIZZAS = '[Products] Remove Pizzas';
export const REMOVE_PIZZAS_FAIL = '[Products] Remove Pizzas Fail';
export const REMOVE_PIZZAS_SUCCESS = '[Products] Remove Pizzas Success';

export class RemovePizzas implements Action {
  readonly type = REMOVE_PIZZAS;
  constructor(public payload: Pizza) {}
}
export class RemovePizzasFail implements Action {
  readonly type = REMOVE_PIZZAS_FAIL;
  constructor(public payload: any) {}
}
export class RemovePizzasSuccess implements Action {
  readonly type = REMOVE_PIZZAS_SUCCESS;
  constructor(public payload: Pizza) {}
}

export type PizzasAction =
  | LoadPizzas
  | LoadPizzasFail
  | LoadPizzasSuccess
  | CreatePizzas
  | CreatePizzasFail
  | CreatePizzasSuccess
  | UpdatePizzas
  | UpdatePizzasFail
  | UpdatePizzasSuccess
  | RemovePizzas
  | RemovePizzasFail
  | RemovePizzasSuccess;
