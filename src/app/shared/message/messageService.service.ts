import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MessageModel } from './messageService.model';

@Injectable()

export class MessageService {

  private loaderSubject = new Subject<MessageModel>();

  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  showMessage(messageDetail) {
    this.loaderSubject.next(<MessageModel>messageDetail);
  }
}
