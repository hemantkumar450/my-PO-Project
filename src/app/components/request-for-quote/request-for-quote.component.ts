import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/api';

import { CustomDDO } from 'src/app/shared/models/custom-ddo.model';
import { LoaderService } from '../../shared/loader/loader.service';
import { RequestQuoteService, RequestQuoteModel, RfqQuestionsModel, RfqItemModel, RequestQuotesQuestionModel } from './shared';
import { VendorService } from '../vendor';
import { LocalStorageService } from '../../shared/service';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http'; /* */
import { ApiUrl } from '../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../shared/message/messageService.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-request-for-quote',
  templateUrl: './request-for-quote.component.html',
  styleUrls: ['./request-for-quote.component.css']
})

export class RequestQuoteComponent implements OnInit {
  requestQuotes: RequestQuoteModel = new RequestQuoteModel();
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'strikeThrough',
      'underline', 'formatOL', 'formatUL', 'insertLink',
      'fontFamily', 'fontSize', 'color', 'quote', 'blockquote'],
    toolbarButtonsXS: ['bold', 'italic', 'strikeThrough',
      'underline', 'formatOL', 'formatUL', 'insertLink',
      'fontFamily', 'fontSize', 'color', 'quote', 'blockquote'],
    toolbarButtonsSM: ['bold', 'italic', 'strikeThrough',
      'underline', 'formatOL', 'formatUL', 'insertLink',
      'fontFamily', 'fontSize', 'color', 'quote', 'blockquote'],
    toolbarButtonsMD: ['bold', 'italic', 'strikeThrough',
      'underline', 'formatOL', 'formatUL',
      'insertLink', 'fontFamily', 'fontSize', 'color', 'quote', 'blockquote'],
    quickInsertTags: ['']
  };
  unitOfMeasurement: Array<CustomDDO>;
  inputTypes: Array<CustomDDO>;
  attachmentName = '';
  isChecked = true;
  routeValue: any;
  isIncludeDocumentCheck = false;
  isPriceSelected = false;
  isQuestionChecked = false;
  dateTime = new Date();
  editorContent = '<p>debanjan</p>';
  @ViewChild('fileInput') fileInput;
  constructor(private loaderService: LoaderService,
    private requestQuoteService: RequestQuoteService,
    private vendorService: VendorService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    public route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.getInputType();
    this.getUnitOfMeasurement();
  }


  vendorList: Array<any> = [];
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;


  getInputType() {
    this.requestQuoteService.getInputType().subscribe(res => {
      this.inputTypes = res;
    });

  }

  getUnitOfMeasurement() {
    this.requestQuoteService.getUnitOfMeasurement().subscribe(res => {
      this.unitOfMeasurement = res;
    });
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  ngOnInit() {
    // this.getCommodities();
    this.routeValue = this.route.snapshot.params['ref'];
  }
  onAttachmentSelect(attachmentDetail) {
    /* save attachment when attachment select */
    const fileBrowser = this.fileInput.nativeElement;
    const formData = new FormData();
    if (fileBrowser.files && fileBrowser.files.length > 0) {

      for (const file of fileBrowser.files) {
        formData.append(file.name, file); /* append image inside fordata */
      }


      const access_token = this.localStorageService.getAccessToken();
      const url = ApiUrl.baseUrl;
      this.http.post(url + `Attachment/addAttachment/rfq-documents/0`, formData, {
        headers: new HttpHeaders({
          'Authorization': `${access_token}`
        })
      }).subscribe((attachments: any) => {
        // res.attachmentPath = res.attachmentPath.replace(/\\/g, '/');
        attachments.map(res => {
          res.attachmentId = res.id;
          res.isDeleted = false;
          this.requestQuotes.rfqAttachments.splice(this.requestQuotes.rfqAttachments.length, -1, res);
        });
      });
    }
  }
  deleteAttachment(file) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete attachment?',
      accept: () => {
        file.isDeleted = true;
      }
    });
  }


  genderateRFQ() {
    this.requestQuotes.rfqVendors = this.requestQuotes.vendors;
    this.requestQuotes.rfqAttachments = this.requestQuotes.rfqAttachments.filter(atchmnt => {
      return atchmnt.isDeleted === false;
    });
    if (!this.requestQuotes.quoteName || !this.requestQuotes.quoteName.trim()) {
      this.messageService.showMessage({ type: 'error', body: 'Name of quote is required!' });
      return false;
    }
    if (!this.requestQuotes.deadline) {
      this.messageService.showMessage({ type: 'error', body: 'Deadline is required!' });
      return false;
    }
    if (!this.requestQuotes.message || !this.requestQuotes.message.trim()) {
      this.messageService.showMessage({ type: 'error', body: 'Message is required!' });
      return false;
    }
    if (this.requestQuotes.vendors.length === 0) {
      this.messageService.showMessage({ type: 'error', body: 'Please add atleast one vendor!' });
      return false;
    }
    if (this.isIncludeDocumentCheck && this.requestQuotes.rfqAttachments.length === 0) {
      this.messageService.showMessage({ type: 'error', body: 'Please include file!' });
      return false;
    }
    // if (!this.isIncludeDocumentCheck) {
    //   this.requestQuotes.rfqAttachments = [];
    // }

    if (this.isPriceSelected && this.requestQuotes.rfqItems) {
      const filterVenor = this.requestQuotes.rfqItems.filter((rq, index) => {
        if (!rq.itemName || !rq.itemName.trim()) {
          this.messageService.showMessage({ type: 'error', body: 'Name of item is required!' });
          return rq;
        }
        if (!rq.uomId) {
          this.messageService.showMessage({ type: 'error', body: 'Unit is required!' });
          return rq;
        }
        if (!rq.quantity) {
          this.messageService.showMessage({ type: 'error', body: 'Quantity is required!' });
          return rq;
        }
      });
      if (filterVenor.length > 0) {
        return false;
      }
    }
    if (!this.isPriceSelected) {
      this.requestQuotes.rfqItems = [];
    }
    if (this.isQuestionChecked && this.requestQuotes.rfqQuestions) {
      const filterVenor = this.requestQuotes.rfqQuestions.filter((rq, index) => {
        if (!rq.question || !rq.question.trim()) {
          this.messageService.showMessage({ type: 'error', body: 'Question is required!' });
          return rq;
        }
        if (!rq.inputTypeId) {
          this.messageService.showMessage({ type: 'error', body: 'Input type is required!' });
          return rq;
        }
      });
      if (filterVenor.length > 0) {
        return false;
      }
    }

    if (!this.isQuestionChecked) {
      this.requestQuotes.rfqQuestions = [];
    }

    this.requestQuoteService.generateRFQ(this.requestQuotes).subscribe((response) => {
      if (response) {
        this.messageService.showMessage({ type: 'success', title: 'Vendor RFQ ', body: 'Save Successfully !' });
        this.router.navigate(['user/rfq']);
      }
    });
  }

  onCheckIncludeDocument() {
    const deletedAttachemnt = this.requestQuotes.rfqAttachments.filter(res => {
      return !res.isDeleted;
    });
    if (!this.isIncludeDocumentCheck && deletedAttachemnt.length > 0) {
      this.confirmationService.confirm({
        message: 'Added attachment will be deleted once you uncheck .Are you sure do you want to delete?',
        accept: () => {
          this.requestQuotes.rfqAttachments = [];
        },
        reject: () => {
          this.isIncludeDocumentCheck = true;
        }
      });
    }
  }

  onPriceSelected() {
    if (!this.isPriceSelected && this.requestQuotes.rfqItems.length > 1) {
      this.confirmationService.confirm({
        message: 'Added Item will be deleted once you uncheck .Are you sure do you want to delete?',
        accept: () => {
          this.requestQuotes.rfqItems = [];
          this.requestQuotes.rfqItems.splice(this.requestQuotes.rfqItems.length, -1, new RfqItemModel());
        },
        reject: () => {
          this.isPriceSelected = true;
        }
      });
    }
    if (!this.isPriceSelected && this.requestQuotes.rfqItems.length === 1) {
      if (this.requestQuotes.rfqItems[0].quantity
        || this.requestQuotes.rfqItems[0].itemName
        || this.requestQuotes.rfqItems[0].uomId) {
        this.confirmationService.confirm({
          message: 'Added Item will be deleted once you uncheck .Are you sure do you want to delete?',
          accept: () => {
            this.requestQuotes.rfqItems = [];
            this.requestQuotes.rfqItems.splice(this.requestQuotes.rfqItems.length, -1, new RfqItemModel());
          },
          reject: () => {
            this.isPriceSelected = true;
          }
        });
      }
    }
  }

  onQuestionSelected() {
    if (!this.isQuestionChecked && this.requestQuotes.rfqQuestions.length > 1) {
      this.confirmationService.confirm({
        message: 'Added question will be deleted once you uncheck .Are you sure do you want to delete?',
        accept: () => {
          this.requestQuotes.rfqQuestions = [];
          this.requestQuotes.rfqQuestions.splice(this.requestQuotes.rfqQuestions.length, -1, new RfqQuestionsModel());
        },
        reject: () => {
          this.isQuestionChecked = true;
        }
      });
    }
    if (!this.isQuestionChecked && this.requestQuotes.rfqQuestions.length === 1) {
      if (this.requestQuotes.rfqQuestions[0].question
        || this.requestQuotes.rfqQuestions[0].inputTypeId) {
        this.confirmationService.confirm({
          message: 'Added question will be deleted once you uncheck .Are you sure do you want to delete?',
          accept: () => {
            this.requestQuotes.rfqQuestions = [];
            this.requestQuotes.rfqQuestions.splice(this.requestQuotes.rfqQuestions.length, -1, new RfqQuestionsModel());
          },
          reject: () => {
            this.isQuestionChecked = true;
          }
        });
      }
    }
  }

  onQuestuionSelected() {
    if (!this.isQuestionChecked && this.requestQuotes.rfqQuestions.length === 0) {
      this.confirmationService.confirm({
        message: 'Added Item will be deleted once you uncheck .Are you sure do you want to delete?',
        accept: () => {
          this.requestQuotes.rfqQuestions = [];
        },
        reject : () => {
          this.isQuestionChecked = true;
        }
      });
    }
  }


  back() {
    if (this.routeValue === 'product-listing') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['user/rfq']);
    }

  }

  addAnotherQuestion() {
    let error = 0;
    let type = '';
    if (this.requestQuotes.rfqQuestions.length > 0) {
      if (!this.requestQuotes.rfqQuestions[this.requestQuotes.rfqQuestions.length - 1].question
        || !this.requestQuotes.rfqQuestions[this.requestQuotes.rfqQuestions.length - 1].question.trim()) {
        error++;
        type = (type === '') ? type.concat(' ', 'Question') : type.concat(' ', ',question');
      }
      if (!this.requestQuotes.rfqQuestions[this.requestQuotes.rfqQuestions.length - 1].inputTypeId) {
        error++;
        type = (type === '') ? type.concat(' ', 'Input type') : type.concat(' ', ',input type');
      }
    }
    if (error === 0) {
      this.requestQuotes.rfqQuestions.splice(this.requestQuotes.rfqQuestions.length, -1, new RfqQuestionsModel());
    } else {
      const message = error === 1 ? type + ' is required!' : type + ' are required!';
      this.messageService.showMessage({ type: 'error', body: message });
    }
  }
  deleteQuestion(index) {
    this.requestQuotes.rfqQuestions.splice(index, 1);
  }

  addAnotherItem() {
    let error = 0;
    let type = '';
    if (this.requestQuotes.rfqItems.length > 0) {
      if (!this.requestQuotes.rfqItems[this.requestQuotes.rfqItems.length - 1].itemName
        || !this.requestQuotes.rfqItems[this.requestQuotes.rfqItems.length - 1].itemName.trim()) {
        error++;
        type = (type === '') ? type.concat(' ', 'Name of item') : type.concat(' ', ',name of item');
      }
      if (!this.requestQuotes.rfqItems[this.requestQuotes.rfqItems.length - 1].uomId) {
        error++;
        type = (type === '') ? type.concat(' ', 'Unit') : type.concat(' ', ',unit');
      }
      if (!this.requestQuotes.rfqItems[this.requestQuotes.rfqItems.length - 1].quantity) {
        error++;
        type = (type === '') ? type.concat(' ', 'Quantity') : type.concat(' ', ',quantity');
      }
    }
    if (error === 0) {
      this.requestQuotes.rfqItems.splice(this.requestQuotes.rfqItems.length, -1, new RfqItemModel);
    } else {
      const message = error === 1 ? type + ' is required!' : type + ' are required!';
      this.messageService.showMessage({ type: 'error', body: message });
    }
  }
  deleteRfqItem(index) {
    this.requestQuotes.rfqItems.splice(index, 1);
  }
  checkIsCheckedAttachment() {
    const attachmentCount = this.requestQuotes.rfqAttachments.filter(res => {
      return !res.isDeleted;
    });
    if (this.isIncludeDocumentCheck && this.requestQuotes.rfqAttachments.length > 0 && attachmentCount.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
