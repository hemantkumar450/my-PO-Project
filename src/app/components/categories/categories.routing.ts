import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SegmentComponent } from './segment/segment.component';
import { FamilyComponent } from './family/family.component';
import { ClassComponent } from './class/class.component';



export const reportRoutes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        redirectTo: 'segment', pathMatch: 'full'
      },
      {
        path: 'segment',
        component: SegmentComponent
      },
      {
        path: 'family',
        component: FamilyComponent
      },
      {
        path: 'class',
        component: ClassComponent
      }
    ]
  }
];

export const routing = RouterModule.forChild(reportRoutes)


