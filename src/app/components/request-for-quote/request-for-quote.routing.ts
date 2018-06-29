import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  RequestQuoteComponent,
  RequestForQuoteEditComponent,
  RequestForQuoteAddComponent
} from './index';
import { AccountComponent } from '../account/account.component';

export const requestQuoteRoutes: Routes = [
  {
    path: '',
    canActivate: [],
    component: AccountComponent,
    children: [
      {
        path: '',
        component: RequestQuoteComponent
      },
      {
        path: 'edit/:id',
        component: RequestForQuoteEditComponent
      },
      {
        path: 'add',
        component: RequestForQuoteAddComponent
      },
      {
        path: 'rfqs',
        loadChildren: '../shared-components/shared-component.module#SharedComponentModule'
      },
    ]
  }
];

export const routing = RouterModule.forChild(requestQuoteRoutes);


