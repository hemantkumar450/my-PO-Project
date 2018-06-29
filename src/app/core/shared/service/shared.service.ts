import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private http: Http,
  ) { }


  public getUserDetail(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'User/GetLoginUserData');
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public isAlreadyLogin(userId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'User/UpdateUserAlreadyLoggedIn' + userId);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public statusList(statusId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Status/listForDDO/' + statusId);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }


}
