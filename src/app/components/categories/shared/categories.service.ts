import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private http: Http,
  ) { }
  headers = new Headers({
    'Content-Type': 'application/json',
  });

  public getSegments(params): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Segment/list');
    return this.http.post(url, params).map((res: Response) => {
      return res.json();
    });
  }

  public getFamily(params): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Family/list');
    return this.http.post(url, { params: params }).map((res: Response) => {
      return res.json();
    });
  }

  public getClass(params): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Class/list');
    return this.http.post(url, { params: params }).map((res: Response) => {
      return res.json();
    });
  }

  private handleError(error: Response) {
    return Observable.throw(error.status);
  }


}
