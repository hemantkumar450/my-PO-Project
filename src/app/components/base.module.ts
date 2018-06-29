import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { LayoutRoutingModule } from './layout-routing.module';
import { BaseComponent } from './base.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../core/shared/header/header.component';
import { FooterComponent } from '../core/shared/footer/footer.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CoreModule,
        SharedModule
    ],

    declarations: [BaseComponent]
})
export class BaseModule { }
