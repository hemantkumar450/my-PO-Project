import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RoleEnum } from '../../../shared/enums';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private router: Router,
        private http: Http) {
    }

    public getUserList(params): Observable<any> {
        const url = (ApiUrl.baseUrl + 'User/list');
        return this.http.post(url, params).map((res: Response) => {
            return res.json();
        });
    }

    public getUserChatList(rfqId, vendorId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'RFQMessage/getByRFQ/' + rfqId + '/' + vendorId);
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }

    public getUserRFQList(params): Observable<any> {
        const url = (ApiUrl.baseUrl + 'RFQVendor/getAllRFQs');
        return this.http.post(url, params).map((res: Response) => {
            return res.json();
        });
    }

}
