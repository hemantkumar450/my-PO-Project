import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartListComponent } from './cart-list.component';

export const cartListRoutes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        component: CartListComponent
      },
      {
        path: 'pr',
        loadChildren: '../shared-components/shared-component.module#SharedComponentModule'
      },
    ]
  }
];

export const routing = RouterModule.forChild(cartListRoutes)


