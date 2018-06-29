import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { VendorAddProductComponent, VendorComponent } from './index';
import { VendorRfqsComponent } from '../vendor/vendor-rfqs/vendor-rfqs.component';
// import { VendorProductComponent } from './vendor-product/vendor-product.component';
import { ProfileDetailComponent } from '../shared-components/profile-detail/profile-detail.component';
import { VendorChatComponent } from './vendor-chat/vendor-chat.component';

import { RequestForQuoteEditComponent } from '../request-for-quote/edit-form/edit-form.component';

import { AccountComponent } from '../account/account.component';
import { ProductMasterAddComponent, ProductMasterGridComponent } from '../product';
import { GeneratePrComponent } from '../user/generate-pr';
export const vendorRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [],
    children: [
      {
        path: 'product-linking',
        component: ProductMasterGridComponent
      },
      {
        path: 'shared',
        loadChildren: '../shared-components/shared-component.module#SharedComponentModule'
      },
      {
        path: 'product/add',
        component: ProductMasterAddComponent
      },
      {
        path: 'product/edit/:id',
        component: ProductMasterAddComponent
      },
      {
        path: 'rfq',
        component: VendorRfqsComponent
      },
      {
        path: 'rfq/edit/:id',
        component: RequestForQuoteEditComponent
      },
      {
        path: 'chat/:id/:rfqNo',
        component: VendorChatComponent
      },
      {
        path: 'generated-pr',
        component: GeneratePrComponent
      }
    ]
  }
];

export const routing = RouterModule.forChild(vendorRoutes);

