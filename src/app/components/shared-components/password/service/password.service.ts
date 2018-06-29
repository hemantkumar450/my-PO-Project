import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../../shared/api.service';
import { PasswordModel } from '../model/password.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class PasswordService {
    constructor(private router: Router,
        private http: Http) {
    }

    public onPasswordUpdate(password: PasswordModel): Observable<any> {
        const url = (ApiUrl.baseUrl + 'User/updatePassword');
        return this.http.put(url,JSON.stringify(password));
    }

}
