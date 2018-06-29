import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { VendorRegisterModel } from './vendor-register.model';

@Injectable({
  providedIn: 'root'
})
export class VendorRegistrationService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private http: Http,
  ) { }

  public registerVendor(registerationDetail: VendorRegisterModel): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Vendor');
    return this.http.post(url, registerationDetail).map((res: Response) => {
      return res.json();
    });
  }

  public upLoadFile(id, companytype, fileData): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Attachment/VendorRegistrationUpload/' + id + '/' + companytype);
    return this.http.post(url, fileData).map((res: Response) => {
      return res.json();
    });
  }

  public getCountries(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Country/list');
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public getVendorDetailById(Id): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Vendor/getById/' + Id);
    return this.http.post(url, url).map((res: Response) => {
      return res.json();
    });
  }

  public upDateSatus(vendorData): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Vendor/updateStatus');
    return this.http.put(url, vendorData).map((res: Response) => {
      return res.json();
    });
  }

  public getOrganisationType(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'OrganisationType/listForDropDown');
    return this.http.post(url, url).map((res: Response) => {
      return res.json();
    });
  }

  private handleError(error: Response) {
    return Observable.throw(error.status);
  }



}
