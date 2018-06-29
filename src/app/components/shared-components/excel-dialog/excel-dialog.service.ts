import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  productData = new BehaviorSubject([]);
  public categoryFilter = new Subject<any>();
  public searchKey: Subject<any>;

  constructor(private http: Http) {
    // this.categoryFilter = new Subject<any>();
    this.searchKey = new Subject<any>();
  }

  public getVendor(): Observable<any> {
    const url = ('../../../assets/json/vendor.json');
    return this.http.get(url, null).map((res: Response) => {
      return res.json();
    });
  }

  
  public getUser(): Observable<any> {
    const url = ('../../../assets/json/user.json');
    return this.http.get(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public getProduct(): Observable<any> {
    const url = ('../../../assets/json/product.json');
    return this.http.get(url, null).map((res: Response) => {
      return res.json();
    });
  }


  public getProductLinking(): Observable<any> {
    const url = ('../../../assets/json/productLinking.json');
    return this.http.get(url, null).map((res: Response) => {
      return res.json();
    });
  }
}
