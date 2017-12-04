import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import * as fromGuards from './guards';
import {effects, reducers} from './store';

export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.ProductsComponent,
    canActivate: [fromGuards.PizzasGuard],
  },
  {
    path: 'new',
    component: fromContainers.ProductItemComponent,
    canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingssGuard],
  },
  {
    path: ':pizzaId',
    component: fromContainers.ProductItemComponent,
    canActivate: [fromGuards.PizzaExistsGuards, fromGuards.ToppingssGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class ProductsModule {}
