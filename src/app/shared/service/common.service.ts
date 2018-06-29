import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { ApiUrl } from '../../../shared/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { ApiUrl } from '../api.service';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    private notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();
    public logo: string = '';

    constructor(private router: Router,
        private http: Http) {
    }

    headers = new Headers({
        'Content-Type': 'application/json',
    });

    public upLoadImage(file, fileId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Attachment/addProfilePicture/');
        return this.http.post(url, JSON.stringify(file));
    }

    public notifyOther(data: any) {
        if (data) {
            this.notify.next(data);
        }
    }

}
