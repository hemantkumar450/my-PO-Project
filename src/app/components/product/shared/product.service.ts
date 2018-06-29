import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductService {
  productData = new BehaviorSubject([]);
  public categoryFilter = new Subject<any>();
  public searchKey: Subject<any>;

  constructor(private http: Http) {
    // this.categoryFilter = new Subject<any>();
    this.searchKey = new Subject<any>();
  }

  public getCatList(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Segment');
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public getsubCatList(data): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Family/segmentlist');
    return this.http.post(url, { params: data }).map((res: Response) => {
      return res.json();
    });
  }

  public getSuperSubCatList(data): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Class/classlist');
    return this.http.post(url, { params: data }).map((res: Response) => {
      return res.json();
    });
  }


  public getProductDetail(vendorProductId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct/get/' + vendorProductId);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  getRelatedList(classId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct/getAll/' + classId);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  // getVendorProductList(param): Observable<any> {
  //   const url = (ApiUrl.baseUrl + 'VendorProduct/GetProductListing');
  //   return this.http.post(url, param).map((res: Response) => {
  //     return res.json();
  //   });
  // }
  getVendorProductList(param): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct/GetProductListing');
    return this.http.post(url, param).map((res: Response) => {
      return res.json();
    });
  }
  getAllFiltration(param): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Commodity/getAllFiltration');
    return this.http.post(url, param).map((res: Response) => {
      return res.json();
    });
  }

  getCompareList(ids): Observable<any> {
    let httpParams = new HttpParams();
    ids.forEach(id => {
      httpParams = httpParams.append('ids', id);
    });
    const url = (ApiUrl.baseUrl + 'VendorProduct/comparelist?' + httpParams);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  addToCart(obj): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Cart');
    return this.http.post(url, obj).map((res: Response) => {
      return res.json();
    });
  }


  getMasterProducts(data): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Product/listByFilter');
    return this.http.post(url, data).map((res: Response) => {
      return res.json();
    });
  }

  saveProduct(data): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Product');
    if (data.id === 0) {
      return this.http.post(url, data).map((res: Response) => {
        return res.json();
      });
    } else {
      return this.http.put(url, data).map((res: Response) => {
        return res.json();
      });
    }
  }

  getProductById(id: number): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Product/get/' + id);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

}
