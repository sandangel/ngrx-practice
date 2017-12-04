import * as fromPizzas from './pizzas.reducer';
import * as fromActions from '../actions/pizzas.action';
import {Pizza} from '../../models/pizza.model';

describe('PizzasReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const {initialState} = fromPizzas;
      const action = {} as any;
      const state = fromPizzas.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });
});
