import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiUrl } from '../../../shared/api.service';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { RequestQuoteService, RequestQuoteModel, RfqQuestionsModel, RfqItemModel } from '../shared';
import { MessageService } from '../../../shared/message/messageService.service';
import { RoleEnum } from '../../../shared/enums';
@Component({
  selector: 'app-invite-vendor',
  templateUrl: './invite-vendor.component.html',
  styleUrls: ['./invite-vendor.component.css']
})
export class InviteVendorComponent implements OnInit {

  display = false;
  brands: string[] = [];
  filteredVendor: any[];
  selectedVendorEmail: any;
  roleEnum = RoleEnum;
  @Input() requestQuotes: RequestQuoteModel;
  @Input() vendorList: Array<any>;
  constructor(private http: Http,
    private requestQuoteService: RequestQuoteService,
    public messageService: MessageService) { }

  ngOnInit() {
  }
  filterProducts(event) {
    this.brands = [];
    const url = (ApiUrl.baseUrl + 'Vendor/get/' + event.query);
    this.http.post(url, null).subscribe(
      (data: any) => {
        this.brands = [...JSON.parse(data._body)];
      },
      error => {
        // this is not called. Ok!
      },
      () => { // when complete
        this.filteredVendor = this.brands;
      }
    );

  }

  onEmailSelect() {
    const selectedVendor = this.requestQuotes.vendors.filter(vendor => {
      return vendor.vendorId === this.selectedVendorEmail.vendorId;
    });
    if (this.requestQuotes.vendors
      && selectedVendor.length === 0) {
      this.selectedVendorEmail.isChecked = true;
      this.requestQuotes.vendors.splice(this.requestQuotes.vendors.length, -1, this.selectedVendorEmail);
    }

    if (selectedVendor.length > 0) {
      this.selectedVendorEmail.isChecked = false;
      this.messageService.showMessage({ type: 'error', title: 'Vendor', body: 'Vendor email is already selected' });
    }
    this.selectedVendorEmail = '';
  }

  removeVendor(index) {
    /* remove selected vendor email */
    this.requestQuotes.vendors.splice(index, 1);

  }
  onSearchTextEvent(selected) {
    this.vendorList = [];
    this.requestQuotes.isSelectedAllVendor = false;
    this.requestQuoteService.getVendorListByCommodityId(selected.id).subscribe(res => {
      res.vendors.map(vendorDetail => {
        const vendorSelected = this.requestQuotes.vendors.filter(vd => {
          return vd.vendorId === vendorDetail.vendorId && vd.isChecked === true;
        });
        if (vendorSelected.length > 0) {
          vendorDetail.isChecked = true;
        } else {
          vendorDetail.isChecked = false;
        }
        this.vendorList.splice(this.vendorList.length, -1, vendorDetail);
      });
      this.onselectVendor();
    });

  }

  onClickSelectAll() {
    if (this.requestQuotes.isSelectedAllVendor) {
      this.vendorList.map(res => {

        res.isChecked = true;

      });
    } else {
      this.vendorList.map(res => {

        res.isChecked = false;

      });
    }
  }

  onselectVendor() {
    this.requestQuotes.isSelectedAllVendor = false;
    const selectedVendor = this.vendorList.filter(res => {
      return res.isChecked === true;
    });
    if (selectedVendor.length === this.vendorList.length) {
      this.requestQuotes.isSelectedAllVendor = true;
    }

  }

  onCancelVendor() {
    this.display = false;
  }
  onFromGroupOpen() {
    this.display = true;
    this.vendorList.map(vl => {
      const selectedVendor = this.requestQuotes.vendors.findIndex(vd => {
        return vd.vendorId === vl.vendorId;
      });
      if (selectedVendor === -1) {
        vl.isChecked = false;
      } else {
        vl.isChecked = true;
      }
    });
    this.onselectVendor();
  }
  onClickVendorSubmit() {
    this.vendorList.map(vl => {
      const selectedVendor = this.requestQuotes.vendors.filter(ro => {
        return ro.vendorId === vl.vendorId;
      });
      if (selectedVendor.length === 0) {
        if (vl.isChecked) {
          this.requestQuotes.vendors.splice(this.requestQuotes.vendors.length, -1, vl);
        }
      } else {
        if (!vl.isChecked) {
          const vendorIndex = this.requestQuotes.vendors.findIndex(rq => {
            return rq.vendorId === vl.vendorId;
          });
          this.requestQuotes.vendors.splice(vendorIndex, 1);
        }
      }
    });

    this.display = false;
  }

 

}
