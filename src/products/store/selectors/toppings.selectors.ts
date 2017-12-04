import {Topping} from '../../models/topping.model';
import {createSelector} from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings,
);

export const getToppingEntities = createSelector(getToppingsState, fromToppings.getToppingEntities);
export const getToppingLoading = createSelector(getToppingsState, fromToppings.getToppingLoading);
export const getToppingLoaded = createSelector(getToppingsState, fromToppings.getToppingLoaded);

export const getAllToppings = createSelector(getToppingEntities, entities =>
  Object.keys(entities).map(id => entities[parseInt(id, 10)]),
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppings.getSelectedToppings,
);
