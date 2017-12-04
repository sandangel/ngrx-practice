import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';

import {AppComponent} from './containers/app/app.component';
import {CustomSerializer, effects, reducers} from './store';

// not used in production
// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

// bootstrap
// routes
export const ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {
    path: 'products',
    loadChildren: '../products/products.module#ProductsModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.development ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [AppComponent],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer}],
  bootstrap: [AppComponent]
})
export class AppModule {}
