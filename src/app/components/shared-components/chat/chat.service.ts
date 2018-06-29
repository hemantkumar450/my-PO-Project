import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';;
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiUrl } from '../../../shared/api.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  constructor(private router: Router,
    private http: Http) {
  }


  public saveMessage(data): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQMessage');
    return this.http.post(url, data).map((res: Response) => {
      return res.json();
    });
  }

}
