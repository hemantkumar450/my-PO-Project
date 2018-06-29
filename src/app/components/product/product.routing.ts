import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ProductListComponent,
  ProductCompareComponent,
  ProductIndividualComponent,
  ProductComponent
} from './index';



export const productRoutes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        component: ProductComponent
      },
      {
        path: 'product-list/:id',
        component: ProductComponent
      },
      {
        path: 'product-list/:id/:name',
        component: ProductComponent
      },
      {
        path: 'individual/:vendorProductId',
        component: ProductIndividualComponent
      },
      {
        path: 'compare',
        component: ProductCompareComponent
      },
      {
        path: 'vendor/:id',
        component: ProductComponent
      }
      // {
      //   path:'product-list/:id',
      //   component:ProductListComponent
      // }
    ]
  }
];

export const routing = RouterModule.forChild(productRoutes)


