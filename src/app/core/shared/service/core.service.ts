import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CoreService {
  public searchKey:Subject<any>;
  public imageUrl :Subject<any>  = new Subject();

  constructor(private http: Http) { 
    this.searchKey = new Subject<any>();
  }

  currentImageUrl(message: string) {
    this.imageUrl.next(message)
  }
}