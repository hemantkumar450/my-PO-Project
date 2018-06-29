import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth.routing';
import { ForgotComponent } from './forgot-password/forgot-password.component';
import {
  VendorRegistrationService,
  AccountDetailComponent,
  ContactDetailComponent,
  VendorRegistrationComponent,
  VendorDetailComponent
} from './vendor-registration/index';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReCaptchaModule } from 'angular2-recaptcha';

@NgModule({
  declarations: [
    SigninComponent,
    ForgotComponent,
    AccountDetailComponent,
    ContactDetailComponent,
    VendorRegistrationComponent,
    VendorDetailComponent
  ],
  imports: [
    ReCaptchaModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class AuthModule { }
