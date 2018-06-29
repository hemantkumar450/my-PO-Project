import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/api';

import { CustomDDO } from 'src/app/shared/models/custom-ddo.model';
import { LoaderService } from '../../../shared/loader/loader.service';
import { RequestQuoteService, RequestQuoteModel, RfqQuestionsModel, RfqItemModel, RequestQuotesQuestionModel } from '../shared';
import { VendorService } from '../../vendor';
import { LocalStorageService } from '../../../shared/service';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http'; /* */
import { ApiUrl } from '../../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../shared/message/messageService.service';
import { FileUploader } from 'ng2-file-upload';
import { RoleEnum } from '../../../shared/enums';
import { SharedService } from '../../../core/shared/service/shared.service';

@Component({
  selector: 'app-request-for-quote-edit',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})

export class RequestForQuoteEditComponent implements OnInit {
  listedItemsState = false;
  cars5: any[];
  rfqId: number;
  scrollableCols: any[];
  frozenCols: any[];
  rfqDetails: RequestQuoteModel = new RequestQuoteModel();

  roleId;
  roleEnum = RoleEnum;
  constructor(private loaderService: LoaderService,
    private requestQuoteService: RequestQuoteService,
    private vendorService: VendorService,
    private localStorageService: LocalStorageService,
    public sharedService: SharedService,
    private http: HttpClient,
    private router: Router,
    public route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.rfqId = +this.route.snapshot.params['id'];
    this.getRfqDetails();
    this.getUserPermission();
  }



  ngOnInit() {


  }
  toggleListedItems(event) {
    this.listedItemsState = !this.listedItemsState;
  }

  getRfqDetails() {
    this.requestQuoteService.getRfqDetail(this.rfqId).subscribe(res => {
      this.setDefault(res);
      res.rfqItems.map(rfqi => {
        res.isEdited = false;
        rfqi.isMouseClick = false;
      });

      this.rfqDetails = res;
    });

  }

  getUserPermission() {
    this.sharedService.getUserDetail().subscribe(res => {
      const user = res;
      this.roleId = user.userRoleIds[0];
    });

  }

  setDefault(res) {
    // res.rfqVendors.map(vendor => {
    res.rfqQuestions.map(question => {
      question.isMouseClick = false;
    });
    res.rfqVendors.map(vendor => {
      vendor.rfqVendorQuotes.map(quote => {
        quote.isMouseClick = false;
        this.generateLabel(quote, vendor);
      });
    });
    // };);
  }

  generateLabel(quote, vendor) {
    quote.isVisibleRfq = false;
    if (quote.isFinalQuote) {
      quote.isVisibleRfq = true;
      if (Number(quote.price) >= 0 && Number(quote.price) <= 100000) {
        vendor.genarateLabel = 'PO';
      }
      if (Number(quote.price) >= 100001) {
        vendor.genarateLabel = 'PR';
      }


    }
    // if (quote.length > 0
    // ) {
    //   rfq.isVisibleRfq = true;
    //   if (Number(quote[0].price) >= 0 || Number(quote[0].price) <= 0) {
    //     rfq.genarateLebel = 'Generate PO';
    //   }
    //   if (Number(quote[0].price) > 100 || Number(quote[0].price) <= 300) {
    //     rfq.genarateLebel = 'Generate PR';
    //   }
    // } else {
    //   rfq.isVisibleRfq = false;
    // }

  }

}

