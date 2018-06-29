
/* importing core libraries from angular */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { TruncatePipe } from '../shared/pipes';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

import {
  AutoCompleteModule,
  CalendarModule,
  DataTableModule,
  CheckboxModule,
  DropdownModule,
  ConfirmDialogModule,
  DialogModule,
  TooltipModule,
  StepsModule,
  MenuModule,
  FileUploadModule,
  RadioButtonModule,
  ChartModule,
  ConfirmationService
} from 'primeng/primeng';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
/* import custom directives */
import {
  OnlyAlphaNumeric,
  emailValidate,
  OnlyDecimalNumber,
  SpecialChars,
  OnlyNumber,
  OnlyAlphabets,
} from '../shared/directives';
/* import common Serive */
import {
  AuthenticationService,
  httpFactory,
  LocalStorageService
} from './service';
import { ApiUrl } from './api.service';
/* import message Serive */
import { MessageService } from '../shared/message/messageService.service';
import { PaginatorModule } from '../core/paginator/paginator';
/* import angular2-multi-select */
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { CommonService } from './service/common.service';
/* ngx-infinite-scroll */
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
/* Trim string directive */
import { FooterComponent } from '../core/shared/footer/footer.component';
import { HeaderComponent } from '../core/shared/header/header.component';
import { AutocompleteComponent } from '../core/shared/autocomplete/autocomplete.component';
import { CartComponent } from '../core/shared/cart/cart.component';
import { NavItemsComponent } from '../core/shared/nav-items/nav-items.component';
import { RFQComponent } from '../components/shared-components/rfq/rfq.component';
import { PasswordComponent } from '../components/shared-components/password/password.component';
import { ChatComponent } from '../components/shared-components/chat/chat.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from '../shared/loader/loader.component';
import { InputTrimDirective } from './directives/trim.directive';
import { AutoCompleteService, AutoCompleteTextboxComponent } from '../components/shared-components/auto-complete';


import { OnlyAlphaNumericDot } from './directives/only-alpa-numericdot.directive';
import { ProductMasterAddComponent, ProductMasterGridComponent, ProductService } from '../components/product';
import { ExcelUploadComponent } from '../components/shared-components/excel-dialog/excel-dialog.component';
import { GeneratePrComponent, GeneratePRService  } from '../components/user/generate-pr';
// import { GeneratePRService, GeneratePrComponent } from './generate-pr';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AutoCompleteModule,
    FileUploadModule,
    CalendarModule,
    DataTableModule,
    DropdownModule,
    CheckboxModule,
    FormsModule,
    PaginatorModule,
    TableModule,
    TabViewModule,
    ConfirmDialogModule,
    AngularMultiSelectModule,
    DialogModule,
    InfiniteScrollModule,
    TooltipModule,
    StepsModule,
    MenuModule,
    RadioButtonModule,
    OverlayPanelModule,
    ChartModule,
    ScrollPanelModule,
    MenuModule,
    SidebarModule
  ],
  exports: [
    ProductMasterAddComponent,
    ProductMasterGridComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    FileUploadModule,
    RadioButtonModule,
    CalendarModule,
    DataTableModule,
    DropdownModule,
    CheckboxModule,
    PaginatorModule,
    TableModule,
    TabViewModule,
    OnlyAlphaNumeric,
    OnlyAlphaNumericDot,
    emailValidate,
    OnlyDecimalNumber,
    SpecialChars,
    OnlyNumber,
    OnlyAlphabets,
    TruncatePipe,
    ConfirmDialogModule,
    AngularMultiSelectModule,
    DialogModule,
    InfiniteScrollModule,
    TooltipModule,
    StepsModule,
    HeaderComponent,
    FooterComponent,
    AutocompleteComponent,
    NavItemsComponent,
    CartComponent,
    OverlayPanelModule,
    MenuModule,
    RFQComponent,
    ChartModule,
    ChatComponent,
    ScrollPanelModule,
    InputTrimDirective,
    SidebarModule,
    ExcelUploadComponent,
    AutoCompleteTextboxComponent,
    GeneratePrComponent,
    // GeneratePRService
  ],
  declarations: [
    ProductMasterAddComponent,
    ProductMasterGridComponent,
    OnlyAlphaNumeric,
    emailValidate,
    OnlyDecimalNumber,
    SpecialChars,
    OnlyNumber,
    OnlyAlphabets,
    TruncatePipe,
    HeaderComponent,
    FooterComponent,
    AutocompleteComponent,
    NavItemsComponent,
    CartComponent,
    InputTrimDirective,
    RFQComponent,
    ChatComponent,
    AutoCompleteTextboxComponent,
    OnlyAlphaNumericDot,
    ExcelUploadComponent,
    GeneratePrComponent

  ],
  providers: [
    ProductService,
    AutoCompleteService,
    // {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: { siteKey: '6Le08l4UAAAAABiS4U26LE5SRKGLGxFuNp-lP419' } as RecaptchaSettings,
    // },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthenticationService,
    LocalStorageService,
    ConfirmationService,
    // GeneratePRService
  ]
})

export class SharedModule { }
