import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './vendor.routing';


import {
  // VendorAddProductComponent,
  VendorComponent,
  VendorService
} from './index';


import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../../shared/shared.module';
import { VendorPermissionComponent } from './vendor-permission/vendor-permission.component';
import { VendorRfqsComponent } from './vendor-rfqs/vendor-rfqs.component';
import { CoreModule } from '../../core/core.module';
import { VendorProductService } from './shared/vendor-product.service';
// import { VendorProductComponent } from './vendor-product/vendor-product.component';

import { RFQComponent } from '../shared-components/rfq/rfq.component';

import { SharedComponentModule } from '../shared-components/shared-component.module';
import { VendorChatComponent } from './vendor-chat/vendor-chat.component';
import { RequestQuoteModule } from '../request-for-quote/request-for-quote.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    CoreModule,
    SharedComponentModule,
    RequestQuoteModule
  ],
  declarations: [
    // VendorAddProductComponent,
    VendorComponent,
    VendorPermissionComponent,
    VendorRfqsComponent,

    // VendorProductComponent,
    VendorChatComponent

  ],
  exports: [
    CoreModule,
    RequestQuoteModule
  ],
  providers: [
    VendorService,
    VendorProductService
  ]
})

export class VendorModule { }
