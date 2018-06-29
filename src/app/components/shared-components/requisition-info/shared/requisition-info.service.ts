import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../../shared/api.service';


@Injectable({
    providedIn: 'root'
})
export class RequisitionInfoService {


    constructor(private router: Router,
        private http: Http) {
    }
    getCompanies(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Company/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }

 


   getPurchaseRequestById(purchaseId:number): Observable<any> {
        const url = (ApiUrl.baseUrl + 'PurchaseOrder/GetByPurchaseId/'+purchaseId);
        return this.http.post(url, null).map((res: Response) => {
              return res.json();
        });
    }
    getDepartments(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'Department/listForDDO');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.departmentName;
                item.value = item.id;
            })
            return data;
        });
    }
    getPRType(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'PRType/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }
    getRequisitionClassification(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'RequisitionClassification/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }


    getSubDepartment(departmentId: number): Observable<any> {
        const url = (ApiUrl.baseUrl + 'SubDepartment/GetById/' + departmentId);
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }

    getPRCategory(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'PRCategory/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.code;
                item.value = item.id;
            })
            return data;
        });
    }

    getSingleSourceJustification(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'SingleSourceJustification/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }


    getContractType(): Observable<any> {
        const url = (ApiUrl.baseUrl + 'ContractType/GetAll');
        return this.http.post(url, null).map((res: Response) => {
            let data = res.json();
            data.map((item) => {
                item.label = item.name;
                item.value = item.id;
            })
            return data;
        });
    }


    getShipToLocation(): Observable<any> {
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



    public savePurchaseRequest(purchaseOrder): Observable<any> {
        const url = (ApiUrl.baseUrl + 'PurchaseOrder');
        return this.http.post(url, JSON.stringify(purchaseOrder)).map((res: Response) => {
            return res.json();
        });
    }

}
