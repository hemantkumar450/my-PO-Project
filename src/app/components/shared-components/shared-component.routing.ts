import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { RFQComponent } from './rfq/rfq.component';
import { PasswordComponent } from './password/password.component';
import { AccountComponent } from '../account/account.component';
import { AppDashboardComponent } from './dashboard';
import { RequisitionInfoComponent } from './requisition-info/requisition-info.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';

export const sharedComponentRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'add',
                component: ProfileDetailComponent
            },
            {
                path: 'dashboard',
                component: AppDashboardComponent
            },
            {
                path: 'edit/:id',
                component: ProfileDetailComponent
            },
            {
                path: 'edit-profile',
                component: ProfileDetailComponent
            },
            {
                path: 'change-password',
                component: PasswordComponent
            },
            {
                path: ':id/requisition-info',
                component: RequisitionInfoComponent
            },
            {
                path: 'requisition-info/edit/:id/:prId',
                component: RequisitionInfoComponent
            },
            {
                path: ':id/purchase-order',
                component: PurchaseOrderComponent
            },
            {
                path: 'purchase-order/edit/:id/:poId',
                component: PurchaseOrderComponent
            },
            {
                path: ':rfqId/rfq-purchase-order/:id',
                component: PurchaseOrderComponent
            },
            {
                path: ':rfqId/rfq-purchase-request/:id',
                component: RequisitionInfoComponent
            },
        ]
    }

]

export const SharedComponentRouting = RouterModule.forChild(sharedComponentRoutes)

