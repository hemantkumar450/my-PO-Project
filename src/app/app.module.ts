import { BrowserModule } from '@angular/platform-browser';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from './shared/message/message.module';
import { LoaderComponent } from './shared/loader/loader.component';
import { BaseModule } from './components/base.module';
import { CoreModule } from './core/core.module';
import { ApiUrl } from './shared/api.service';
import { PaginationService } from './shared/service/pagination.service';
import { LoaderService } from './shared/loader/loader.service';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {
    AuthenticationService,
    httpFactory,
    LocalStorageService
} from './shared/service';
import { MessageService } from './shared/message/messageService.service';
import { Router } from '@angular/router';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { UserIdleModule } from 'angular-user-idle'

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent,
        ForbiddenComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        BaseModule,
        HttpModule,
        CoreModule,
        AppRoutingModule,
        AuthModule,
        BrowserAnimationsModule,
        SharedModule,
        BrowserAnimationsModule,
        MessageModule,
        // UserIdleModule.forRoot({idle: 10, timeout: 10, ping: 5})
    ],
    exports: [LoaderComponent, SharedModule, ForbiddenComponent],

    providers: [ToasterService, ApiUrl, PaginationService, LoaderService
        // {
        //     provide: Http,
        //     useFactory: httpFactory,
        //     deps: [XHRBackend, RequestOptions, ApiUrl, Router, LocalStorageService, LoaderService, MessageService]
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
