import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { ForgotComponent } from './forgot-password/forgot-password.component';
import { VendorRegistrationComponent } from './vendor-registration';


const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: SigninComponent
  },
  {
    path: 'forgot-password',
    component: ForgotComponent
  },
  {
    path: 'vendor-registration',
    component: VendorRegistrationComponent
  },
  {
    path: 'vendor-edit/:id',
    component: VendorRegistrationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
