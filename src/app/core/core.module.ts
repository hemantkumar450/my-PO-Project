import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { CoreRoutingModule } from './core-routing.module';
import { LeftMenuComponent } from './shared/left-menu/left-menu.component';
import { CommonModule } from '@angular/common';
import { LeftMenuService } from './shared/left-menu/left-menu.service';

import { AccountComponent } from '../components/account/account.component';

import { CartService } from './shared/cart/shared/cart.service';
import { CoreService } from './shared/service/core.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {
  AuthenticationService,
  httpFactory,
  LocalStorageService
} from '../shared/service';
import { MessageService } from '../shared/message/messageService.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ApiUrl } from '../shared/api.service';
import { LoaderService } from '../shared/loader/loader.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LeftMenuComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KeyFilterModule,
    DropdownModule,
    CoreRoutingModule,
    HttpClientModule,
    SharedModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  exports: [
    LeftMenuComponent,
    AccountComponent,
    SharedModule,
    FroalaEditorModule
  ],
  providers: [
    LeftMenuService,
    CartService,
    CoreService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, ApiUrl, Router, LocalStorageService, LoaderService, MessageService]
    }
  ]
})
export class CoreModule { }
