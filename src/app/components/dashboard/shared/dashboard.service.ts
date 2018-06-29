import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private router: Router,
        private http: Http) {
    }

    public getProductList(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'ContainerContent/list');
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }

    public getFamilyList(segmentId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Family/list/');
        return this.http.post(url + segmentId, null).map((res: Response) => {
            return res.json();
        });
    }


    public getClassList(familyId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Class/list/');
        return this.http.post(url + familyId, null).map((res: Response) => {
            return res.json();
        });
    }

    public getCommodityList(classId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Commodity/list/');
        return this.http.post(url + classId, null).map((res: Response) => {
            return res.json();
        });
    }


}
