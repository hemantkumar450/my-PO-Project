import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../../shared/api.service';

@Injectable()
export class CartService {

  constructor(private router: Router,
    private http: Http) {
  }

  public updateAddCart(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Cart/GetInfo');
    return this.http.post(url, null).map((res: any) => {
      return res.json();
    });
  }
}
