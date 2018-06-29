import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';

@Injectable()
export class VendorProductService {

  constructor(private http: Http) { }


  public getAllVendorProducts(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct/getAll');
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }


}
