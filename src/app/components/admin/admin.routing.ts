import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
// import { AdminLeftMenuComponent } from './admin-left-menu/admin-left-menu.component';
import { UserListComponent } from '../user/user-list/user-list.component';
import { VendorPermissionComponent } from '../vendor/vendor-permission/vendor-permission.component';
// import { VendorProductComponent } from '../vendor/vendor-product/vendor-product.component';
// import { VendorAddProductComponent } from '../vendor';
import { AccountComponent } from '../account/account.component';
import { ProductMasterAddComponent, ProductMasterGridComponent } from '../product';

export const adminRoutes: Routes = [
    {
        path: '',
        canActivate: [],
        component: AccountComponent,
        children: [
            {
                path: 'user',
                loadChildren: '../shared-components/shared-component.module#SharedComponentModule'
            },
            {
                path: 'products',
                component: ProductMasterGridComponent
            },
            {
                path: 'product/add',
                component: ProductMasterAddComponent
            },
            {
                path: 'users',
                component: UserListComponent
            },
            {
                path: 'vendors',
                component: VendorPermissionComponent
            },
            {
                path: 'vendor-product',
                component: ProductMasterGridComponent
            },
            {
                path: 'vendor-product/edit/:id',
                component: ProductMasterAddComponent
            },
            {
                path: 'home-page-cms',
                loadChildren: '../cms/cms.module#CmsModule'
            }
        ]
    }
];

export const routing = RouterModule.forChild(adminRoutes)

