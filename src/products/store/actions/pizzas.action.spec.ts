import * as fromPizzas from './pizzas.action';

describe('Pizzas Actions', () => {
  describe('LoadPizzas Action', () => {
    describe('LoadPizzas', () => {
      it('should create an action', () => {
        const action = new fromPizzas.LoadPizzas();
        expect({...action}).toEqual({
          type: fromPizzas.LOAD_PIZZAS,
        });
      });
    });
  });
});
