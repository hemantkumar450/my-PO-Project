import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../../shared/api.service';

@Injectable()
export class AutoCompleteService {

  constructor(private http: Http) { }

  public callAutoComplete(componentName: string, searchText: string): Observable<any> {
    const url = ApiUrl.baseUrl + componentName + '/getDDOBySearchParam?commodityName=' + searchText;
    return this.http.post(url, null).map((res: Response) => {
      const arr = [];
      res.json().forEach(element => {
        const obj = {
          id: element.id,
          name: element.name
        };

        arr.splice(arr.length, 0, obj);
      });
      return arr;
    });
  }
}
