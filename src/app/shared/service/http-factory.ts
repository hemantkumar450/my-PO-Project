import { Router } from '@angular/router';
import { XHRBackend, Http, RequestOptions } from '@angular/http';
 import { HttpInterceptor } from './http-interceptor.service';
import { ApiUrl } from '../../shared/api.service';
import { LocalStorageService } from './local-storage.service';
import { MessageService } from '../message/messageService.service';
import { LoaderService } from '../loader/loader.service';

export function httpFactory(xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  apiService: ApiUrl,
  router: Router,
  localStorageService: LocalStorageService,
  loaderService: LoaderService,
  messageService: MessageService) {
   return new HttpInterceptor(xhrBackend, requestOptions, apiService, router, localStorageService, loaderService, messageService);
}
