import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../../shared/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProfileModel } from '../model/profile-detail.model';
import { Subject } from 'rxjs/Subject';

@Injectable({
    providedIn: 'root'
})
export class ProfileDetailsService {
    token: string;
    imageUrl: Subject<any>;

    constructor(private router: Router,
        private http: Http) {
        this.imageUrl = new Subject();
    }

    headers = new Headers({
        'Content-Type': 'application/json',
    });


    public gerUserDetailById(userId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'User/get/');
        return this.http.post(url + userId, null).map((res: Response) => {
            return res.json();
        });
    }

    public getUserProfile(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'User/profile');
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }
    public gerRoleDDO(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Role/listforDDo');
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }

    public getModuleListById() {
        const url = (ApiUrl.baseUrl + 'UserPermission/list/');
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });

    }

    public saveUserDetail(user: ProfileModel, isSelfProfileEdit: boolean): Observable<any> {
        let url = (ApiUrl.baseUrl + 'User');
        if (isSelfProfileEdit) {
            url = (ApiUrl.baseUrl + 'User/profile');
        }
        if (user.id > 0) {
            return this.http.put(url, JSON.stringify(user));
        } else {
            return this.http.post(url, JSON.stringify(user));
        }
    }

}
