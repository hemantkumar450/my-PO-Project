import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../../shared/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable({
    providedIn: 'root'
})
export class PurchaseOrderService {

    constructor(private router: Router,
        private http: Http) {
    }

    headers = new Headers({
        'Content-Type': 'application/json',
    });
    public getVendorByVendorId(vedorId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Vendor/getByVendorId/' + vedorId);
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }

    public getPurchaseOrderByPurchaseOrderId(purchaseId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'PurchaseOrder/GetByPurchaseId/'+ purchaseId);
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }

    public savePurchaseOrder(purchaseOrder): Observable<any> {
        const url = (ApiUrl.baseUrl + 'PurchaseOrder');
        return this.http.post(url, JSON.stringify(purchaseOrder)).map((res: Response) => {
            return res.json();
        });
    }

    public getPaymentTerms(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'PaymentTerm/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }

    public sourceType(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'SourceType/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }


    public shipToLocation(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'ShipToLocation/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }

    public community(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Community/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }

    public poChargeAccount(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'POChargeAccount/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }

    public poCurrency() {
        let data = [];
        data = [{
            label: 'USD',
            value: 'usd'
        }, {
            label: 'AED',
            value: 'aed'
        }]
        return data;
    }

    contract() {
        let data = [];
        data = [{
            label: 'Yes',
            value: true
        }, {
            label: 'No',
            value: false
        }]
        return data;
    }

    getBudget() {
        let data = [];
        return data = [{
            label: 'Yes',
            value: true
        }, {
            label: 'No',
            value: false
        }]
    }

    public getPurchaseOrder(isRFQ,id): Observable<any> {
        let url = (ApiUrl.baseUrl + 'PurchaseOrder/GetCart/' + id);
        if(isRFQ){
           url = (ApiUrl.baseUrl + 'PurchaseOrder/GetPurchaseItemDataForRFQById/' + id);
        }
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }

    // public getCartList(): Observable<any> {
    //     const url = (ApiUrl.baseUrl + 'Cart/GetAllById');
    //     return this.http.post(url, null).map((res: Response) => {
    //       return res.json();
    //     });
    //   }

    public getBuyerDetail(vendorId): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Vendor/getByVendorId/' + vendorId);
        return this.http.post(url, null).map((res: Response) => {
            return res.json();
        });
    }


    public getPOChargeAccount(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'POChargeAccount/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }

}
