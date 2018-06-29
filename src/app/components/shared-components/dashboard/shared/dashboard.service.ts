import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../../shared/api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(private http: Http) { }

  public getDashboard(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Dashboard');
    return this.http.post(url, url).map((res: Response) => {
      return res.json();
    });
  }

}
