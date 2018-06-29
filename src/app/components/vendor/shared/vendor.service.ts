import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../../../shared/api.service';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: Http) { }


  public getCategories(): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Segment');
    return this.http.post(url, null).map((res: Response) => {
      let data: any = res.json();
      let results: Array<CustomDDO> = [];
      data.map((item) => {
        let obj = { label: item.segmentName, value: item.id }
        results.push(obj);
      });
      return results;
    });
  }

  public getVendorList(params): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Vendor/getAllVendors');
    return this.http.post(url, params).map((res: Response) => {
      return res.json();
    });
  }

  public getVendorRFQList(params): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQVendor/getAllRFQs');
    return this.http.post(url, { params: params }).map((res: Response) => {
      return res.json();
    });
  }

  public upDateSatus(vendorData): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Vendor/updateStatus');
    return this.http.put(url, vendorData).map((res: Response) => {
      return res.json();
    });
  }

  public getVendorChatList(rfId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'RFQMessage/getByRFQ/' + rfId + '/0');
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }


  public getStatus(vendorStatus): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Status/listForDDO/' + vendorStatus);
    return this.http.post(url, null).map((res: Response) => {
      let data: any = res.json();
      let results: Array<CustomDDO> = [];
      data.map((item) => {
        let obj = { label: item.statusName, value: item.id };
        results.push(obj);
      });
      return results;
    });
  }

  public getSubCategoriesbyCategoryId(catId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Family/list/' + catId);
    return this.http.post(url, null).map((res: Response) => {
      let data: any = res.json();
      let results: Array<CustomDDO> = [];
      data.map((item) => {
        let obj = { label: item.familyName, value: item.id }
        results.push(obj);
      });
      return results;
    });
  }

  public getSSCategoriesbySubCategoryId(subCatId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Class/list/' + subCatId);
    return this.http.post(url, null).map((res: Response) => {
      const data: any = res.json();
      const results: Array<CustomDDO> = [];
      data.map((item) => {
        const obj = { label: item.className, value: item.id }
        results.push(obj);
      });
      return results;
    });
  }

  public getCommodities(commodityName): Observable<any> {
    if (commodityName) {
      const str = commodityName.filterValue;
      const n = str.length;
      if (n > 2) {
        const url = (ApiUrl.baseUrl + 'Commodity/getAllForDDO?commodityName=' + commodityName.filterValue);
        return this.http.post(url, null).map((res: Response) => {
          const data: any = res.json();
          const results: Array<CustomDDO> = [];
          data.map((item) => {
            const obj = { label: item.commodityName, value: item.id }
            results.push(obj);
          });
          return results;
        });
      } else {
        const url = (ApiUrl.baseUrl + 'Commodity/getAllForDDO');
        return this.http.post(url, null).map((res: Response) => {
          const data: any = res.json();
          const results: Array<CustomDDO> = [];
          data.map((item) => {
            const obj = { label: item.commodityName, value: item.id }
            results.push(obj);
          });
          return results;
        });
      }
    } else {
      const url = (ApiUrl.baseUrl + 'Commodity/getAllForDDO');
      return this.http.post(url, null).map((res: Response) => {
        const data: any = res.json();
        const results: Array<CustomDDO> = [];
        data.map((item) => {
          const obj = { label: item.commodityName, value: item.id }
          results.push(obj);
        });
        return results;
      });
    }
  }

  public getProducts(commodityId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Product/list/' + commodityId);
    return this.http.post(url, null).map((res: Response) => {
      let data: any = res.json();
      let results: Array<CustomDDO> = [];
      data.products.map((item) => {
        let obj = { label: item.productName, value: item.id }
        results.push(obj);
      });
      data.products = results;
      return data;
    });
  }

  public populateProductProperties(productId): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Product/get/' + productId);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public getStatusList(id): Observable<any> {
    const url = (ApiUrl.baseUrl + 'Status/listForDDO/' + id);
    return this.http.post(url, null).map((res: Response) => {
      let data: any = res.json();
      let results: Array<CustomDDO> = [];
      data.map((item) => {
        let obj = { label: item.statusName, value: item.id }
        results.push(obj);
      });
      return results;
    });
  }

  public changeStatus(obj): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct/updateStatus');
    return this.http.put(url, obj).map((res: Response) => {
      return res.json();
    });
  }

  productLinkByVendor(obj): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct');
    if (obj.id === 0) {
      return this.http.post(url, obj).map((res: Response) => {
        return res.json();
      });
    } else {
      return this.http.put(url, obj).map((res: Response) => {
        return res.json();
      });
    }

  }

  getProductById(id): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct/getForEdit/' + id);
    return this.http.post(url, null).map((res: Response) => {
      return res.json();
    });
  }

  public getAllVendorProducts(params): Observable<any> {
    const url = (ApiUrl.baseUrl + 'VendorProduct/getAllForAdmin');
    return this.http.post(url, params).map((res: Response) => {
      return res.json();
    });
  }

  public getUOMList() {
    const url = (ApiUrl.baseUrl + 'UOM');
    return this.http.post(url, null).map((res: Response) => {
      let data: any = res.json();
      let results: Array<CustomDDO> = [];
      data.map((item) => {
        let obj = { label: item.uomName, value: item.id }
        results.push(obj);
      });
      return results;
    });
  }

}
