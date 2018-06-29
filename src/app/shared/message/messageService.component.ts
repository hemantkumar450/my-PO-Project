import { Component, OnInit, OnDestroy, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageModel } from './messageService.model';
import { MessageService } from './messageService.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
    selector: 'app-message',
    templateUrl: 'messageService.component.html',
    styleUrls: ['messageService.component.css']
})
export class MessageSericeComponent implements OnInit, OnDestroy, AfterViewInit {

    private subscription: Subscription;
    messageDetail: MessageModel = new MessageModel();
    public config1: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });

    constructor(
        public messageService: MessageService,
        public toasterService: ToasterService
    ) {
    }

    ngOnInit() {
        this.subscription = this.messageService.loaderState
            .subscribe((state: MessageModel) => {
                this.messageDetail = state;
                this.messageDetail.showCloseButton = true;
                this.toasterService.pop(this.messageDetail);
            });
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
