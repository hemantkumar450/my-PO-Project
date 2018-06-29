import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { routing } from './user.routing';
import { UserComponent } from './user.component';
import { DataTableModule } from 'primeng/datatable';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';
import { PaginatorModule } from '../../core/paginator/paginator';
import { CoreModule } from '../../core/core.module';
import { UserRfqsComponent } from './user-rfq/user-rfq.component';
import { SharedModule } from '../../shared/shared.module';
import { UserrChatComponent } from './user-chat/user-chat.component';
import { RequestQuoteModule } from '../request-for-quote/request-for-quote.module';
import { GeneratePRService, GeneratePrComponent } from './generate-pr'

@NgModule({
    declarations: [
        UserComponent,
        UserListComponent,
        // GeneratePrComponent,
        UserRfqsComponent,
        UserrChatComponent
    ],
    exports: [
        AccordionModule, SharedModule, CoreModule, RequestQuoteModule
    ],
    imports: [
        CommonModule,
        CarouselModule,
        AccordionModule,
        DataTableModule,
        routing,
        PaginatorModule,
        CoreModule,
        RequestQuoteModule,
        SharedModule
    ],
    providers: [
        UserService,
        // GeneratePRService
    ]
})
export class UserModule { }
