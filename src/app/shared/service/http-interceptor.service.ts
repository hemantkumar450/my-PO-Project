import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiUrl } from '../../shared/api.service';
import { LocalStorageService } from './local-storage.service';
import { MessageService } from '../message/messageService.service';
import { LoaderService } from '../loader/loader.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Injectable()
export class HttpInterceptor extends Http {
  contador = 0;
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private apiService: ApiUrl,
    private router: Router,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService,
    public messageService: MessageService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
    // return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    // return super.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    // return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    // return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    // return super.delete(url, this.getRequestOptionArgs(options));
  }


  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');

    const access_token = this.localStorageService.getAccessToken();
    if (access_token !== '') {
      document.cookie = 'Authorization=' + access_token;
      options.headers.append('authorization', access_token);
    }

    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    this.contador++;
    if (this.contador === 1) {
      this.loaderService.show();
    }
    return observable.catch((err, source) => {
      // this.error.isError = true;
      // this.error.errorMessages = [];
      this.contador--;
      if (this.contador === 0) {
        this.loaderService.hide();
      }
      if (err.status === 401) {                     // UnOthorised Access
        this.localStorageService.removeLogin();
        this.router.navigate(['/login']);
        this.loaderService.hide();
        return Observable.empty();
      } else if (err.status === 403) {
        this.router.navigate(['/forbidden']);
        this.loaderService.hide();
        return Observable.empty();
      }
      else if (err.status === 0) {                // Api Connection Refused
        this.showErrorMessage('Server down!');
        return Observable.throw(err);
      } else if (err.status === 404) {              // API path not found
        // this.showErrorMessage('404 (Path not found!)');
        return Observable.throw(err);
      } else if (err.status === 400) {              // Bad Request
        const errorResult = err.json();
        if (errorResult.validationErrors && errorResult.validationErrors.length > 0) {
          errorResult.validationErrors.forEach(errMsg => {
            this.showErrorMessage(errMsg.ErrorMessage);
          });
          const error = errorResult.validationErrors[0].errorMessage;
          this.showErrorMessage(error);
          this.loaderService.hide();
          if (errorResult.validationErrors[0].errorCode === 120 ||
            errorResult.validationErrors[0].errorCode === 115) {
            return Observable.throw(err);
          } else {
            return;
          }
        } else {
          this.showErrorMessage(errorResult);
        }
        return Observable.throw(err);
        //  errorResult = err._body;
        // this.showErrorMessage(errorResult);
      } else if (err.status === 500) {              // Internal Server error
        this.showErrorMessage('500 (Internal Server error)');
        this.loaderService.hide();
        return;
        // return Observable.throw(err);
      } else {
        return Observable.throw(err);
      }
    })
      .do(event => {
        if (event) { // <--only when event is a HttpRespose
          this.contador--;
          if (this.contador === 0) {
            this.loaderService.hide();
          }
        }
      });
    // .finally(() => {
    //   this.contador--;
    //   if (this.contador === 0) {
    //   this.loaderService.hide();
    //   }
    // });
  }

  private showErrorMessage(errorMessage) {
    if (!errorMessage) return;
    this.messageService.showMessage({ type: 'error', title: 'Authentication', body: errorMessage });
  }
}



// import { Observable } from 'rxjs/Observable';
// import { Location } from '@angular/common';
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { HttpRequest } from '@angular/common/http';
// import { HttpHandler } from '@angular/common/http';
// import { HttpEvent } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/operator/do';
// import { LocalStorageService } from './local-storage.service';
// import { LoaderService } from '../loader/loader.service';
// @Injectable()
// export class CustomHttpInterceptor implements HttpInterceptor {
//   constructor(private localStorageService: LocalStorageService,
//     private loaderService: LoaderService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.loaderService.show();
//     const access_token = this.localStorageService.getAccessToken();
//     if (access_token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: access_token
//         }
//       });
//     }
//     return next.handle(request).do((event: HttpEvent<any>) => {
//       if (event instanceof HttpResponse) {
//         this.loaderService.hide();
//         // do stuff with response if you want
//       }
//     }, (err: any) => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status === 401) {
//           this.loaderService.hide();
//           // redirect to the login route
//           // or show a modal
//         }
//       }
//     });
//   }

  // private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
  //   Promise<HttpEvent<any>> {
  //   let changedRequest = request;
  //   // HttpHeader object immutable - copy values
  //   const headerSettings: { [name: string]: string | string[]; } = {};

  //   for (const key of request.headers.keys()) {
  //     headerSettings[key] = request.headers.getAll(key);
  //   }
  //   const access_token = this.localStorageService.getAccessToken();
  //   if (access_token) {
  //     headerSettings['Authorization'] = access_token;
  //   }
  //   headerSettings['Content-Type'] = 'application/json';
  //   const newHeader = new HttpHeaders(headerSettings);

  //   changedRequest = request.clone({
  //     headers: newHeader
  //   });
  //   return next.handle(changedRequest).toPromise();
  // }



