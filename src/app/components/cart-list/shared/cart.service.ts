import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class CartService {

  constructor(private http: Http) { }


  public getCartList(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Cart/GetAllById');
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public updateCartList(data): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Cart/UpdateList');
    return this.http.put(url, data).map((res: Response) => {
      return res.json();
    });
  }


  public deleteCartList(ids): Observable<any> {
    let httpParams = new HttpParams();
    ids.forEach(id => {
      httpParams = httpParams.append('id', id);
    });
    const url = (ApiUrl.baseUrl + 'Cart?' + httpParams);
    return this.http.delete(url).map((res: Response) => {
      return res.json();
    });
  }

}
