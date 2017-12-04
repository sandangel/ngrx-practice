import {PizzasGuard} from './pizzas.guard';
import {ToppingssGuard} from './toppings.guard';
import {PizzaExistsGuards} from './pizzas-exists.guard';

export const guards: any[] = [PizzasGuard, PizzaExistsGuards, ToppingssGuard];

export * from './pizzas.guard';
export * from './pizzas-exists.guard';
export * from './toppings.guard';
