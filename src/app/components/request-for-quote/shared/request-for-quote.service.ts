import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';
import { RequestQuoteModel } from '.';

@Injectable()
export class RequestQuoteService {

  constructor(private http: Http) { }

  public getCategories(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Segment');
    return this.http.post(url, null).map((res: Response) => {
      let data: any = res.json();
      let results: Array<CustomDDO> = [];
      data.map((item) => {
        let obj = { label: item.segmentName, value: item.id };
        results.push(obj);
      });
      return results;
    });
  }

  public getRfqDetail(Id): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQVendor/' + Id);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }


  public getVendorListByCommodityId(Id): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct/GetVendorsByCommodity?commodityId=' + Id);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }


  public generateRFQ(reuestQuoteModel: RequestQuoteModel): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQ');
    return this.http.post(url, reuestQuoteModel).map((res: Response) => {
      return res.json();
    });
  }

  public getSubCategoriesbyCategoryId(catId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Family/list/' + catId);
    return this.http.get(url).map((res: Response) => {
      let data: any = res.json();
      let results: Array<CustomDDO> = [];
      data.map((item) => {
        let obj = { label: item.familyName, value: item.id }
        results.push(obj);
      });
      return results;
    });
  }
  public getInputType(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'InputType');
    return this.http.post(url, null).map((res: Response) => {
      const data: any = res.json();
      const results: Array<CustomDDO> = [];
      data.map((item) => {
        const obj = { label: item.name, value: item.id };
        results.push(obj);
      });
      return results;
    });
  }

  public getUnitOfMeasurement(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'UOM');
    return this.http.post(url, null).map((res: Response) => {
      const data: any = res.json();
      const results: Array<CustomDDO> = [];
      data.map((item) => {
        const obj = { label: item.uomName, value: item.id };
        results.push(obj);
      });
      return results;
    });
  }

  public saveRfqVendorQuotes(rfqvendorQuotes): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQVendorQuote');
    return this.http.post(url, rfqvendorQuotes).map((res: Response) => {

      return res.json();
    });
  }

  public submitQuestion(question): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQQuestionResponse');
    return this.http.post(url, question).map((res: Response) => {
      return res.json();
    });
  }
  public updateQuote(quote): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQItemPrice?isQuoteSubmitted=' + quote.isQuoteSubmitted);
    return this.http.post(url, quote).map((res: Response) => {
      return res.json();
    });
  }
  public setSendForNegotiation(vendors): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQVendor');
    return this.http.put(url, vendors).map((res: Response) => {
      return res.json();
    });
  }
  public saveLineItem(rfq): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQItem');
    return this.http.post(url, rfq).map((res: Response) => {
      return res.json();
    });
  }
  public deleteItem(rfq): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQItem/delete');
    return this.http.post(url, rfq).map((res: Response) => {
      return res.json();
    });
  }
}
