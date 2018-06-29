import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

import { GeneratePrComponent } from './generate-pr/generate-pr.component';
import { RFQComponent } from '../shared-components/rfq/rfq.component';

import { AccountComponent } from '../account/account.component';
import { UserRfqsComponent } from './user-rfq/user-rfq.component';
import {RequestForQuoteEditComponent} from '../request-for-quote/edit-form/edit-form.component';

import { UserrChatComponent } from './user-chat/user-chat.component';
import { RequestQuoteComponent } from '../request-for-quote';



export const userRoutes: Routes = [
    {
        path: '',
        canActivate: [],
        component: AccountComponent,
        children: [
            {
                path: 'account',
                loadChildren: '../shared-components/shared-component.module#SharedComponentModule'
            },
            {
                path: 'generated-pr',
                component: GeneratePrComponent
            },
            {
                path: 'rfq',
                component: UserRfqsComponent
            },
            {
                path: 'rfq/edit/:id',
                component: RequestForQuoteEditComponent
            },
            {
                path: 'chat/:rfqId/:vendorId/:rfqNo',
                component: UserrChatComponent
            },
            {
                path: 'requestQuote/:ref',
                component: RequestQuoteComponent
            }
        ]
    }
];

export const routing = RouterModule.forChild(userRoutes)

