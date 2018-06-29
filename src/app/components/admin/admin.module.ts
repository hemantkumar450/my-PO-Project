import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { routing } from './admin.routing';
import { AdminComponent } from './admin.component';
import { DataTableModule } from 'primeng/datatable';

import { UserModule } from '../user/user.module';
import { SharedModule } from '../../shared/shared.module';
import { AccessRightComponent } from './access-rights/access-right.component';
import { VendorModule } from '../vendor/vendor.module';
import { VendorPermissionComponent } from '../vendor/vendor-permission/vendor-permission.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
    declarations: [
        AdminComponent,
        AccessRightComponent
    ],
    exports: [
        AccordionModule, SharedModule
    ],
    imports: [
        CommonModule,
        CarouselModule,
        AccordionModule,
        DataTableModule,
        SharedModule,
        VendorModule,
        routing,
        UserModule,
        CoreModule
    ]
})
export class AdminModule { }
