import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratePRService {

  constructor(private http: Http) {
  }

  public getGeneratePR(params): Observable<any> {
    const url = (ApiUrl.baseUrl + 'PurchaseOrder/GetAllList');
    return this.http.post(url, params).map((res: Response) => {
      return res.json();
    });
  }

}