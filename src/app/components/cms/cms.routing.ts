import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsComponent } from './cms.component';
import {  CmsDetailComponent } from './cms-detail/cms-detail.component';

export const cmsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CmsComponent
      },
      {
        path: ':cmsId/edit',
        component: CmsDetailComponent
      }
    ]
  }
];

export const routing = RouterModule.forChild(cmsRoutes);
