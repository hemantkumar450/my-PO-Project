import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routing } from './cms.routing';
import { SharedModule } from '../../shared/shared.module';
import {CmsComponent} from './cms.component';
import {CmsDetailComponent} from './cms-detail/cms-detail.component';
import {ContainerOneComponent} from './container-one/container-one.component';
import {ContainerTwoComponent} from './container-two/container-two.component';
import {ContainerThreeComponent} from './container-three/container-three.component';
import {ContainerFourComponent} from './container-four/container-four.component';
import { CmsService } from './shared/cms.service';
import { CoreModule } from '../../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    CoreModule
  ],
  declarations: [
    CmsComponent,
    CmsDetailComponent,
    ContainerOneComponent,
    ContainerTwoComponent,
    ContainerThreeComponent,
    ContainerFourComponent
  ],
  exports: [
    SharedModule,
    CoreModule
  ],
  providers: [
    CmsService
    // VendorService
  ]
})

export class CmsModule { }
