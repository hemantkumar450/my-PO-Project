import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../shared/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginModel } from './auth.model';

@Injectable({
  providedIn: 'root' /* by using providerIn we don't need to import service on provider array in module */
})

export class AuthService {
  token: string;

  constructor(private router: Router,
    private http: Http) { }

  headers = new Headers({
    'Content-Type': 'application/json',
  });

  public onLogin(loginDetail: LoginModel): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Login');
    return this.http.post(url, loginDetail).map((res: Response) => {
      return res.json();
    });
  }

  public forgotPassword(userDetail): Observable<any> {
    const url = (ApiUrl.baseUrl + 'User/resetPassword/' + userDetail);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public tokenVerify(email, token): Observable<any> {
    const url = (ApiUrl.baseUrl + 'User/verifyToken/' + email + '/' + token);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public resetPassword(obj): Observable<any> {
    const url = (ApiUrl.baseUrl + 'User/updatePassword?isReset=true');
    return this.http.put(url, obj).map((res: Response) => {
      return res.json();
    });
  }


}
