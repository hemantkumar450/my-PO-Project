import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';



export const dashBoardRoutes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
    ]
  }
];

export const routing = RouterModule.forChild(dashBoardRoutes)

