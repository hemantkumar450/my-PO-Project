import { Component, OnInit, ViewEncapsulation, ViewChild, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/api';

import { CustomDDO } from 'src/app/shared/models/custom-ddo.model';
import { LoaderService } from '../../../shared/loader/loader.service';
import {
  RequestQuoteService,
  RequestQuoteModel, RfqQuestionsModel, RfqItemModel, RequestQuotesQuestionModel
} from '../shared';
import { VendorService } from '../../vendor';
import { LocalStorageService } from '../../../shared/service';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http'; /* */
import { ApiUrl } from '../../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../shared/message/messageService.service';
import { FileUploader } from 'ng2-file-upload';
import { RoleEnum, QuestionTypeEnum } from '../../../shared/enums';

@Component({
  selector: 'app-pdu-question',
  templateUrl: './pdu-question.component.html',
  styleUrls: ['./pdu-question.component.css']
})
export class PduQuestionComponent implements OnInit, OnChanges {

  listedItemsState = false;
  cars5: any[];
  rfqId: number;
  scrollableCols: any[];
  frozenCols: any[];
  roleId;
  roleEnum = RoleEnum;
  isSendForNegotiation = true;
  @Input() rfqDetails: RequestQuoteModel;
  @Input() resquestQuotesQuestion: RequestQuotesQuestionModel;
  @ViewChild('file') fileInput;
  questionTypeEnum = QuestionTypeEnum;
  constructor(private loaderService: LoaderService,
    private requestQuoteService: RequestQuoteService,
    private vendorService: VendorService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    public route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.generateQuestion();
  }

  generateQuestion() {

  }
  submitAnswer(question) {
    this.requestQuoteService.submitQuestion(question).subscribe(res => {
      const message = 'Answer submit successfully';
      this.messageService.showMessage({ type: 'success', title: 'Update', body: message });
    });

  }


  upload(files, question) {
    /* save attachment when attachment select */
    const fileBrowser = this.fileInput.nativeElement;
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
      });
    }
  }
  toggleListedItems(event) {
    this.listedItemsState = !this.listedItemsState;
  }
  setNegotioanForVendor() {

    this.checkVendorIsCheckedForNegotiation();
    this.requestQuoteService.setSendForNegotiation( this.checkVendorIsCheckedForNegotiation()).subscribe(res => {
      this.isSendForNegotiation = false;
    });
  }

  checkVendorIsCheckedForNegotiation() {
    const vendSendForNegotiation = this.rfqDetails.rfqVendors.filter(res => {
      return res.sendForNegotiation;
    });
    return vendSendForNegotiation;
  }
}

