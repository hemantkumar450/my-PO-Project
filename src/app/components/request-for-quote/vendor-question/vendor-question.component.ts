import { Component, OnInit, ViewEncapsulation, ViewChild, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/api';
import 'rxjs/add/operator/map';

import { CustomDDO } from 'src/app/shared/models/custom-ddo.model';
import { LoaderService } from '../../../shared/loader/loader.service';
import {
  RequestQuoteService,
  RequestQuoteModel,
  RfqQuestionsModel,
  RfqItemModel,
  RequestQuotesQuestionModel,
  RfqvendorQuotesModel
} from '../shared';
import { VendorService } from '../../vendor';
import { LocalStorageService } from '../../../shared/service';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http'; /* */
import { ApiUrl } from '../../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../shared/message/messageService.service';
import { FileUploader } from 'ng2-file-upload';
import { RoleEnum, QuestionTypeEnum, RFQStatusEnum } from '../../../shared/enums';
import { SharedService } from '../../../core/shared/service/shared.service';
@Component({
  selector: 'app-vendor-question',
  templateUrl: './vendor-question.component.html',
  styleUrls: ['./vendor-question.component.css']
})
export class VendorQuestionComponent implements OnInit, OnChanges {
  @Input() rfqDetails: RequestQuoteModel;
  @ViewChild('file') fileInput;
  @ViewChild('file1') qutesFile;
  @ViewChild('uploadQuote') uploadQuote;
  roleId: number;
  questionTypeEnum = QuestionTypeEnum;
  listedItemsState = false;
  addQuotesDisplay = false;
  isUpdateQuote;
  isSendForNegotiation = true;
  roleEnum = RoleEnum;
  rfqStatusEnum = RFQStatusEnum;
  rfqvendorQuotes: RfqvendorQuotesModel = new RfqvendorQuotesModel();
  finalrfqvendorQuotes: RfqvendorQuotesModel = new RfqvendorQuotesModel();
  unitOfMeasurement: Array<CustomDDO>;
  constructor(private loaderService: LoaderService,
    private requestQuoteService: RequestQuoteService,
    private vendorService: VendorService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    public route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public sharedService: SharedService) {
    this.getAccessFrom();
  }

  ngOnInit() {
    this.getUnitOfMeasurement();
  }
  ngOnChanges() {
    this.generateQuestion();
    this.setSubmitQuoteText();
    this.setSendForNegotiartion();
    this.isShowNegotiation();

  }

  generateQuestion() {

  }
  submitAnswer(question) {
    if (question.inputTypeId === this.questionTypeEnum.Text
      && !question.questionResponse || question.questionResponse === '') {
      this.messageService.showMessage({ type: 'error', body: 'Answer required!' });
      return false;
    }
    if (question.inputTypeId === this.questionTypeEnum.Attachment
      && !question.attachmentId || question.attachmentId === '') {
      this.messageService.showMessage({ type: 'error', body: 'Attachment required!' });
      return false;
    }
    if (question.inputTypeId === this.questionTypeEnum.Text
      && !question.questionResponse || question.questionResponse === '') {
      this.messageService.showMessage({ type: 'error', body: 'Question ' + question.question + ' required!' });
      return false;
    }
    this.requestQuoteService.submitQuestion(question).subscribe(res => {
      const message = 'Answer submit successfully';
      this.messageService.showMessage({ type: 'success', title: 'Update', body: message });
    });

  }


  upload(files, question, type) {
    /* save attachment when attachment select */
    let fileBrowser;
    if (type === 'addQuotes') {
      fileBrowser = this.qutesFile.nativeElement;
    }

    if (type === 'question') {
      fileBrowser = files.target;
    }

    const formData = new FormData();
    if (fileBrowser.files && fileBrowser.files.length > 0) {

      for (const file of fileBrowser.files) {
        formData.append(file.name, file); /* append image inside fordata */
      }


      const access_token = this.localStorageService.getAccessToken();
      const url = ApiUrl.baseUrl;
      let id = 0;
      if (question.attachmentId || question.attachmentId > 0) {
        id = question.attachmentId;
      }
      this.http.post(url + `Attachment/addAttachment/rfq-documents/` + id, formData, {
        headers: new HttpHeaders({
          'Authorization': `${access_token}`
        })
      }).subscribe((attachments: any) => {
        // res.attachmentPath = res.attachmentPath.replace(/\\/g, '/');
        question.attachmentId = attachments[0].id;
        question.attachementNameDisplay = attachments[0].attachmentName;
        question.attachmentUrl = attachments[0].attachmentUrl;
        if (type === 'addQuotes') {
          question.attachmentName = attachments[0].attachmentName;
        }
      });
    }
  }
  toggleListedItems(event) {
    if (this.rfqDetails.rfqItems.length > 0) {
      this.listedItemsState = !this.listedItemsState;
    }
  }

  addQuotes() {
    this.rfqvendorQuotes = new RfqvendorQuotesModel();
    this.addQuotesDisplay = true;

  }
  submitRfqQutoes() {
    /* submit rfq code from popup */
    if (!this.rfqvendorQuotes.price || this.rfqvendorQuotes.price === '') {
      this.messageService.showMessage({ type: 'error', body: 'Price is required!' });
      return false;
    }
    if (!this.rfqvendorQuotes.attachmentId) {
      this.messageService.showMessage({ type: 'error', body: 'Attachment is required!' });
      return false;
    }
    this.rfqvendorQuotes.rfqVendorId = this.rfqDetails.rfqVendors[0].id;
    this.requestQuoteService.saveRfqVendorQuotes(this.rfqvendorQuotes).subscribe(res => {
      this.rfqDetails.rfqVendors[0]
        .rfqVendorQuotes
        .splice(this.rfqDetails.rfqVendors[0].rfqVendorQuotes.length, -1, res);
      const message = 'Add quotes successfully';
      this.rfqDetails.rfqVendors[0].isQuoteSubmitted = true;
      this.messageService.showMessage({ type: 'success', title: 'Update', body: message });
      this.isShowNegotiation();
      this.addQuotesDisplay = false;
    });

  }

  setSubmitQuoteText() {
    const submitted = this.rfqDetails.rfqVendors.filter(res => {
      return res.isQuoteSubmitted === true;
    });
    if (submitted.length > 0) {
      this.isUpdateQuote = true;
    } else {
      this.isUpdateQuote = false;
    }

  }

  updateQuote() {
    let rfqQuery;
    this.rfqDetails.rfqVendors.map(rfqDetail => {
      rfqQuery = rfqDetail.rfqItemPrices;
    });
    rfqQuery.isQuoteSubmitted = this.isUpdateQuote;
    const price = rfqQuery.filter(rq => {
      return !rq.totalPrice || rq.totalPrice === '';
    });
    // if (price.length > 0) {
    //   this.messageService.showMessage({ type: 'error', body: 'Price should not be empty!' });
    //   return false;
    // }
    this.requestQuoteService.updateQuote(rfqQuery).subscribe(res => {
      this.rfqDetails.rfqVendors.map(rfqDetail => {
        rfqDetail.isQuoteSubmitted = res;
      });
      this.messageService.showMessage({ type: 'success', title: 'Update', body: 'Price has updated successfully' });
      this.setSubmitQuoteText();
    });
  }

  getAccessFrom() {
    this.sharedService.getUserDetail().subscribe(res => {
      const currentUser = res;
      this.roleId = currentUser.userRoleIds[0];
    });
  }
  getUnitOfMeasurement() {
    this.requestQuoteService.getUnitOfMeasurement().subscribe(units => {
      this.unitOfMeasurement = units;
    });
  }

  addNewCode(vendor) {
    let error = 0;
    let type = '';
    if (vendor.rfqItems.length > 0) {
      if (!vendor.rfqItems[vendor.rfqItems.length - 1].itemName
        || !vendor.rfqItems[vendor.rfqItems.length - 1].itemName.trim()) {
        error++;
        type = (type === '') ? type.concat(' ', 'Item') : type.concat(' ', ',item');
      }
      if (!vendor.rfqItems[vendor.rfqItems.length - 1].uomId) {
        error++;
        type = (type === '') ? type.concat(' ', 'Uom') : type.concat(' ', ',uom');
      }
      if (!vendor.rfqItems[vendor.rfqItems.length - 1].quantity) {
        error++;
        type = (type === '') ? type.concat(' ', 'Quantity') : type.concat(' ', ',quantity');
      }
    }
    if (error === 0) {
      this.listedItemsState = true;
      if (vendor.rfqItems) {
        const rfqItem = new RfqItemModel();
        rfqItem.isVendorItem = true;
        rfqItem.isEdited = true;
        rfqItem.rfqId = vendor.id;
        vendor.rfqItems.splice(vendor.rfqItems.length, -1, rfqItem);
      }

      vendor.rfqVendors.map(rfqvndr => {
        const rfqVendor = new RfqvendorQuotesModel();
        rfqVendor.isVendorItem = true;
        rfqvndr.rfqItemPrices.splice(rfqvndr.rfqItemPrices.length, -1, rfqVendor);
      });
    } else {
      const message = error === 1 ? type + ' is required!' : type + ' are required!';
      this.messageService.showMessage({ type: 'error', body: message });
    }
  }

  setNegotioanForVendor() {

    const sendForNegotiation = this.checkVendorIsCheckedForNegotiation();
    if (sendForNegotiation.length === 0) {
      const message = ' Please select atleast one vendor!';
      this.messageService.showMessage({ type: 'error', body: message });
      return false;
    }
    this.requestQuoteService.setSendForNegotiation(this.checkVendorIsCheckedForNegotiation()).subscribe(res => {
      const message = 'Request send for negotiation';
      this.messageService.showMessage({ type: 'success', title: 'Update', body: message });
      this.isSendForNegotiation = false;
    });
  }
  setSendForNegotiartion() {
    this.isSendForNegotiation = true;
    const negotionationlength = this.checkVendorIsCheckedForNegotiation();
    if (negotionationlength.length > 0) {
      this.isSendForNegotiation = false;
    }
  }
  isShowNegotiation() {
    const selectedVendor = this.rfqDetails.rfqVendors.filter(vendor => {
      return vendor.isQuoteSubmitted;
    });
    if (selectedVendor.length > 0) {
      return true;
    } else {
      return false;
    }

  }
  checkVendorIsCheckedForNegotiation() {
    const vendSendForNegotiation = this.rfqDetails.rfqVendors.filter(res => {
      return res.sendForNegotiation;
    });
    return vendSendForNegotiation;
  }

  editLineItem(index) {
    this.rfqDetails.rfqItems[index].isEdited = true;
  }
  saveLineItem(rfq, index) {
    let error = 0;
    let type = '';
    if (!rfq.itemName || !rfq.itemName.trim()) {
      error++;
      type = (type === '') ? type.concat(' ', 'Item') : type.concat(' ', ',item');
    }
    if (!rfq.uomId) {
      error++;
      type = (type === '') ? type.concat(' ', 'Uom') : type.concat(' ', ',uom');
    }
    if (!rfq.quantity) {
      error++;
      type = (type === '') ? type.concat(' ', 'Quantity') : type.concat(' ', ',quantity');
    }
    if (error === 0) {
      this.requestQuoteService.saveLineItem(rfq).subscribe(res => {
        this.rfqDetails.rfqItems[index] = res;
        const message = 'Line item saved successfully';
        this.messageService.showMessage({ type: 'success', title: 'Update', body: message });
        this.unitOfMeasurement.map(ufm => {
          if (ufm.value === res.uomId) {
            this.rfqDetails.rfqItems[index].uomName = ufm.label;
          }
        });
        this.rfqDetails.rfqItems[index].isEdited = false;
      });
    } else {
      const message = error === 1 ? type + ' is required!' : type + ' are required!';
      this.messageService.showMessage({ type: 'error', body: message });
    }

  }

  deleteLineItem(rfq, index) {
    if (rfq.id) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this item?',
        accept: () => {
          this.requestQuoteService.deleteItem(rfq).subscribe(result => {
            const message = 'Line item deleted successfully';
            this.messageService.showMessage({ type: 'success', title: 'Update', body: message });
            this.deleteRfqItem(index);
          });
        }
      });
    }

    if (!rfq.id) {
      this.deleteRfqItem(index);
    }

  }

  deleteRfqItem(index) {
    this.rfqDetails.rfqItems.splice(index, 1);
    this.rfqDetails.rfqVendors.map(rfqVendor => {
      rfqVendor.rfqItemPrices.splice(index, 1);
    });
    if (this.rfqDetails.rfqItems.length === 0) {
      this.listedItemsState = false;
    }
  }
  onClickQuestion(selectedIndex) {
    this.rfqDetails.rfqQuestions.map((rfq, index) => {
      rfq.isMouseClick = false;
      if (selectedIndex === index) {
        rfq.isMouseClick = true;
      }
    });

    this.rfqDetails.rfqVendors.map(rfqv => {
      rfqv.rfqQuestionResponses.map((question, index) => {
        question.isMouseClick = false;
        if (index === selectedIndex) {
          question.isMouseClick = true;
        }
      });
    });
  }

  onClickRfqItemClick(selectedIndex) {
    this.rfqDetails.rfqItems.map((rfq, index) => {
      rfq.isMouseClick = false;
      if (selectedIndex === index) {
        rfq.isMouseClick = true;
      }
    });
    this.rfqDetails.rfqVendors.map(rfqv => {
      rfqv.rfqItemPrices.map((question, index) => {
        question.isMouseClick = false;
        if (index === selectedIndex) {
          question.isMouseClick = true;
        }
      });
    });
  }


  onClickUploadCode(event) {
  }



  generateQuotes(rfq) {
    if (rfq.genarateLabel === 'PO') {
      this.router.navigate(['user/rfqs/' + rfq.id + '/rfq-purchase-order/' + rfq.vendorId]);
    } else {
      this.router.navigate(['user/rfqs/' + rfq.id + '/rfq-purchase-request/' + rfq.vendorId]);
    }

  }


}
