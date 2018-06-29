import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './request-for-quote.routing';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import {
  RequestForQuoteAddComponent,
  RequestForQuoteEditComponent,
  RequestQuoteComponent,
  RequestQuoteService
} from './index';
import { InviteVendorComponent } from './invite-vendor/invite-vendor.component';
import { VendorQuestionComponent } from './vendor-question/vendor-question.component';
import { PduQuestionComponent } from './pdu-question/pdu-question.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FileUploadModule,
    CheckboxModule,
    ScrollPanelModule,
    SharedModule,
    CoreModule
  ],
  declarations: [
    RequestQuoteComponent,
    RequestForQuoteAddComponent,
    RequestForQuoteEditComponent,
    InviteVendorComponent,
    VendorQuestionComponent,
    PduQuestionComponent
  ],
  providers: [
    RequestQuoteService]
})

export class RequestQuoteModule { }
