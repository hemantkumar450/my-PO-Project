//angular library
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//components
import { RequisitionInfoComponent } from './requisition-info/requisition-info.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import {CartListViewComponent} from './cart-list-view/cart-list-view.component';
import { RFQComponent } from './rfq/rfq.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { PasswordComponent } from './password/password.component';
import { SharedComponentRouting } from './shared-component.routing';

//services
import { PurchaseOrderService } from './purchase-order/shared/purchase-order.service';
import { RequisitionInfoService } from './requisition-info/shared/requisition-info.service';
import { AppDashboardComponent, DashboardService } from './dashboard';
import { ChatService } from './chat/chat.service';
import { PasswordService } from './password/service/password.service';

//modules
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

//third party library
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
    imports: [
        CommonModule,
        SharedComponentRouting,
        SharedModule,
        CoreModule
    ],
    exports: [
        SharedModule,
        CoreModule
    ],
    declarations: [
        PasswordComponent,
        ProfileDetailComponent,
        AppDashboardComponent,
        RequisitionInfoComponent,
        PurchaseOrderComponent,
        CartListViewComponent
    ],
    providers: [
        PasswordService,
        ChatService,
        DashboardService,
        PurchaseOrderService,
        RequisitionInfoService
    ]
})

export class SharedComponentModule { }
