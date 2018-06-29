import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { routing } from './product.routing';
import { DataViewModule } from 'primeng/dataview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {
  ProductComponent,
  ProductCompareComponent,
  ProductFeatureBarComponent,
  ProductFeatureTypeComponent,
  ProductListComponent,
  ProductRelatedListComponent,
  ProductIndividualComponent
} from './index';
import { CoreModule } from '../../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    TabViewModule,
    DataViewModule,
    ScrollPanelModule,
    CoreModule
  ],
  providers: [],
  declarations: [
    ProductComponent,
    ProductCompareComponent,
    ProductFeatureBarComponent,
    ProductFeatureTypeComponent,
    ProductListComponent,
    ProductRelatedListComponent,
    ProductIndividualComponent,
  ],
  exports: [CoreModule]
})

export class ProductModule { }
