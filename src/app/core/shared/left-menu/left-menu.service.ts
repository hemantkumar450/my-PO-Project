import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApiUrl } from '../../../shared/api.service';

@Injectable()
export class LeftMenuService {


    constructor(private router: Router,
        private http: Http) {
    }


    public gerUserImage(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Attachment/0');
        return this.http.post(url, null).map((res: any) => {
            return res.json();
        });
    }
    public getLeftMenu(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'UserPermission/leftMenu');
        return this.http.post(url, null).map((res: any) => {
            return res.json();
        });
    }


}
