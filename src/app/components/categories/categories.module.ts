import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { routing } from './categories.routing';
import { SegmentComponent } from './segment/segment.component';
import { CoreModule } from '../../core/core.module';
import { FamilyComponent } from './family/family.component';
import { ClassComponent } from './class/class.component';
import { CategoryService } from './shared/categories.service';
import { PaginatorModule } from '../../core/paginator/paginator';

@NgModule({
  imports: [
    CommonModule,
    routing,
    CoreModule,
    PaginatorModule
  ],
  declarations: [
    SegmentComponent,
    FamilyComponent,
    ClassComponent
  ],
  exports: [
  ],
})

export class CategoriesModule { }
