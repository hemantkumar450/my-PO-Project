import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { CarouselModule } from 'primeng/carousel';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { AccordionModule } from 'primeng/accordion';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ProductListComponent } from './product-list/product-list.component';
import { routing } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './shared/dashboard.service';
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [
    SliderComponent,
    ProductCategoriesComponent,
    ProductListComponent,
    DashboardComponent
  ],
  exports: [
    SliderComponent,
    ProductCategoriesComponent,
    AccordionModule,
    ProductListComponent,
    TieredMenuModule
  ],
  imports: [
    CommonModule,
    CarouselModule,
    AccordionModule,
    routing,
    TieredMenuModule,
    CoreModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
