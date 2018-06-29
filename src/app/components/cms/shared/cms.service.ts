import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Injectable({
    providedIn: 'root'
})
export class CmsService {
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    constructor(private http: Http,
        private httpClient: HttpClient
    ) { }
    headers = new Headers({
        'Content-Type': 'application/json',
    });

    // public async getCms() {
    //     const url = (ApiUrl.baseUrl + 'Container/list');
    //     return await this.httpClient.get(url);
    // }

    public getCms(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Container/list');
        //  return this.httpClient.get(url);
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }
    public getCmsDetail(cms): Observable<any> {

        const url = (ApiUrl.baseUrl + 'ContainerContent/get/' + cms.id);
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }
    public getProductList(params): Observable<any> {
        const url = (ApiUrl.baseUrl + 'VendorProduct/GetAllProductByProducts');
        return this.http.post(url, params).map((res: Response) => {
            return res.json();
        });
    }
    public getVendorList(params): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Vendor/getAllApprovedVendors');
        return this.http.post(url, params).map((res: Response) => {
            return res.json();
        });
    }
    public saveCmsDetails(cmsDetail): Observable<any> {
        const url = (ApiUrl.baseUrl + 'ContainerContent');
        return this.http.put(url, cmsDetail).map((res: Response) => {
            return res.json();
        });
    }

    public upload(formData): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Attachment/addAttachment/home-page');
        return this.http.post(url, formData).map((res: Response) => {
            return res.json();
        });
    }

    private handleError(error: Response) {
        return Observable.throw(error.status);
    }


}
