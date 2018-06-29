import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MessageService } from '../../../shared/message/messageService.service';
import { SharedService } from '../../../core/shared/service/shared.service';
import { ApiUrl } from '../../../shared/api.service';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../shared/service';
import { ErrorModel } from './excel.model';
import { BulkUploadEnum } from '../../../shared/enums';
import { ExcelService } from './excel-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../shared/loader/loader.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel-dialog.component.html',
  styleUrls: ['./excel-dialog.component.css']
})
export class ExcelUploadComponent implements OnInit {
  @Input() showContent: boolean;
  @Input() type: any;
  @Output() showContentFalse = new EventEmitter();
  @ViewChild('file') fileInput: any;
  errors: Array<ErrorModel> = [];
  cols = [];
  data = [];

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private excelService: ExcelService,
    protected router: Router,
    public loaderService: LoaderService,
  ) { }

  ngOnInit() {
    const url = this.router.url;
    if (this.type === 'Vendors') {
      this.excelService.getVendor().subscribe(res => {
        this.setData(res);
      });
    }

    if (this.type === 'Users') {
      this.excelService.getUser().subscribe(res => {
        this.setData(res);
      });
    }
    if (this.type === 'Products' && url === '/admin/products') {
      this.excelService.getProduct().subscribe(res => {
        this.setData(res);
      });
    }
    if (this.type === 'Products' && url === '/admin/vendor-product') {
      this.excelService.getProductLinking().subscribe(res => {
        this.setData(res);
      });
    }
  }

  setData(res) {
    this.data = res.data.data;
    this.cols = res.data.header;
  }

  showContentFile() {
    this.showContent = false;
    this.showContentFalse.emit('false');
    this.errors = [];
  }

  upload(files) {
    if (files.length > 0) {
      /* upload excel files  */
      const formd = new FormData();
      for (const file of files) {
        formd.append(file.name, file);
      }
      const access_token = this.localStorageService.getAccessToken();
      this.loaderService.show();
      const url = ApiUrl.baseUrl; /* Dynamic API comes from api.service.ts */
      this.http.post(url + `FileUpload/uploadFile/` + this.type, formd, {
        headers: new HttpHeaders({
          'Authorization': `${access_token}`
        })
      }).subscribe((res: any) => {
        if (res) {
          this.messageService.showMessage({ type: 'success', title: 'Document', body: 'Update Successfully' });
          this.showContent = false;
          this.loaderService.hide();
          this.fileInput.nativeElement.value = '';
        }
      }, err => {
        if (err.error.validationErrors) {
          this.errors = err.error.validationErrors;
          this.loaderService.hide();
          this.fileInput.nativeElement.value = '';
        } else {
          this.messageService.showMessage({ type: 'error', title: 'Excel Upload', body: 'Internal Server Error' });
          this.loaderService.hide();
          this.fileInput.nativeElement.value = '';
        }

      });
    }

  }
}
