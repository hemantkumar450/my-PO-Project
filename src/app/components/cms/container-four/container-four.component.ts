import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Category } from '../../product';
import { CmsModel, AttachmentModel } from '../shared/cms.model';
import { DataTable, Message } from 'primeng/primeng';

import { CategoryService } from '../../categories/shared/categories.service';
import { SegementModel } from '../../categories/shared/categories.model';
import { PaginationService } from '../../../shared/service/pagination.service';
import { LocalStorageService } from '../../../shared/service/local-storage.service';
import { ApiUrl } from '../../../shared/api.service';
import { CmsService } from '../shared/cms.service';
import { MessageService } from '../../../shared/message/messageService.service';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { Paginator } from '../../../core/paginator/paginator';

@Component({
  selector: 'app-container-four',
  templateUrl: './container-four.component.html',
  styleUrls: ['./container-four.component.css']
})

export class ContainerFourComponent implements OnInit {
  @Input() cmsDetail: CmsModel;
  @Input() cmsPermission;
  @Input() roleId;
  scrollDistance = 1;
  totalRecords: number;
  pagingDetail: any;
  filterText: string;
  showContent = false;
  isDisabled = false;
  page = 0;
  vendors: Array<any> = [];
  pageSize: number = PaginationEnum.PageSize;
  @ViewChild('fileInput') fileInput;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  pageEvent = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0
  }
  pageNo: number = 0;
  isPageJumpCall: boolean = false;
  totalPages: number = 0;

  constructor(private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
    private paginationService: PaginationService,
    private cmsService: CmsService,
    private http: HttpClient,
    private messageService: MessageService) { }

  ngOnInit() {
    this.pagingDetail = this.paginationService.getParamsForAutoScroll();
    this.getVendor();
  }

  onAttachmentSelect(attachmentDetail) {
    /* save attachment on select image*/
    const fileBrowser = this.fileInput.nativeElement;
    const formData = new FormData();
    if (fileBrowser.files) {
      for (const file of fileBrowser.files) {
        formData.append(file.name, file);
      }
      const access_token = this.localStorageService.getAccessToken();
      const url = ApiUrl.baseUrl;
      let attachmentId = 0;
      let selectedAttachment;
      if (this.cmsDetail.attachments.length > 0) {
        selectedAttachment = this.cmsDetail.attachments.filter(res => {
          return res.isDeleted === true;
        });
        if (selectedAttachment && selectedAttachment.length > 0) {
          attachmentId = selectedAttachment[0].id;
        }

      }
      this.http.post(url + `Attachment/addAttachment/home-page/` + attachmentId, formData, {
        headers: new HttpHeaders({
          'Authorization': `${access_token}`
        })
      }).subscribe((attachment: any) => {
        attachment.map(res => {
          res.attachmentPath = res.attachmentPath.replace(/\\/g, '/');
          res.attachmentId = res.id;
          this.cmsDetail.attachments.splice(this.cmsDetail.attachments.length, -1, res);
        });
      });
    }
  }

  remove(file) {
    file.isDeleted = true;
  }

  getVendor(): void {
    /* get vendor List   */

    this.cmsService.getVendorList(this.paginationService.getParams()).subscribe(res => {
      const vendors = this.cmsDetail.vendors;
      res.data.map(productDetails => {
        const findProductIndex = this.cmsDetail.vendors.findIndex(pr => {
          return pr.vendorId === productDetails.vendorId && pr.isChecked === true;
        });
        if (findProductIndex !== -1) {
          productDetails.isChecked = true;
        } else {
          productDetails.isChecked = false;
        }
      });
      this.vendors = res.data;
      this.totalRecords = res.totalRecords;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      if (this.isPageJumpCall) {
        this.paginatorComponent._first = this.pageNo - 1;
        this.paginatorComponent.getPage();
        this.paginatorComponent.changePage(this.paginatorComponent._first, null)
        this.isPageJumpCall = false;
      } else {
        this.pageNo = this.paginatorComponent === undefined ? 1 : this.paginatorComponent.getPage() + 1;
      }
    });
  }

  onPressDelete(vendor) {
    /* make isChecked and isFinallySubmit false to delete vendor from final page */
    vendor.isChecked = false;
    vendor.isfinallySubmitted = false;
    const findIndex = this.vendors.findIndex(pr => {
      return pr.vendorId === vendor.vendorId;
    });
    if (findIndex !== -1) {
      this.vendors[findIndex].isChecked = false;
    }

  }
  submitVendor() {
    /* make isfinallysubmit true when user submit selected vendor from popup
    and validate whether selected vendor is equal to six */
    const vendorCount = this.getSelectedVendorLength();
    if (vendorCount === 6) {
      this.cmsDetail.vendors.map(res => {
        if (res.isChecked === true) {
          res.isfinallySubmitted = true;
        } else {
          res.isfinallySubmitted = false;
        }
      });
      this.showContent = false;
    } else {
      this.messageService.showMessage({ type: 'error', title: '', body: 'Please Select Six Vendors !' });
    }
  }

  onShowProducts(): void {
    /* to show popup */
    this.showContent = true;
  }
  onClickVendorFromVendorList(categoryDetails): void {
    /* make isChecked true when select vendor from grid
     and splice it on vendor array and if vendor exist peviuoly then make ishecked true */
    const findIndex = this.cmsDetail.vendors.findIndex(pr => {
      return pr.vendorId === categoryDetails.vendorId;
    });
    if (categoryDetails.isChecked) {

      if (findIndex !== -1) {
        this.cmsDetail.vendors[findIndex].isChecked = true;
      } else {
        categoryDetails.isfinallySubmitted = false;
        categoryDetails.isChecked = true;
        this.cmsDetail.vendors.splice(this.cmsDetail.vendors.length, -1, categoryDetails);
      }

    } else {
      if (findIndex !== -1) {
        this.cmsDetail.vendors[findIndex].isChecked = false;
      }

    }
  }

  onCloseVendor(vendorDetails): void {
    /* close selected vendor from final page */
    const findIndex = this.vendors.findIndex(pr => {
      return pr.vendorId === vendorDetails.vendorId;
    });
    const findProductIndex = this.cmsDetail.vendors.findIndex(pr => {
      return pr.vendorId === vendorDetails.vendorId;
    });
    if (findProductIndex !== -1) {
      this.cmsDetail.vendors[findProductIndex].isChecked = false;
    }
    if (findIndex !== -1) {
      this.vendors[findIndex].isChecked = false;
    }
  }

  getSelectedVendorLength() {
    /* return selected vendor length */
    const productCount = this.cmsDetail.vendors.filter(product => {
      return product.isChecked === true;
    });
    return productCount.length;
  }

  checkAttachmentLength() {
    /* return length of selected attachement */
    const activeAttachmentCount = this.cmsDetail.attachments.filter(res => {
      return res.isDeleted === false;
    });
    if (activeAttachmentCount.length === 1) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  onClickFile(e) {
    /* restrict attacment file uploades only one on click of attachemnt button*/
    const activeAttachmentCount = this.cmsDetail.attachments.filter(res => {
      return res.isDeleted === false;
    });
    if (activeAttachmentCount.length >= 1) {
      e.preventDefault();
      this.messageService.showMessage({ type: 'error', title: '', body: 'You can attach only one file !' });
    }
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.pageNo = event.page + 1;
    this.pageSize = this.paginatorComponent._rows;
    this.paginationService.setPageChange(event);
    this.getVendor();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getVendor();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginationService.setPageChange(this.pageEvent);
    this.paginationService.setFilterValues(event.filters);
    this.getVendor();
  }

  onPageEvent() {
    this.pageEvent = {
      first: Number((this.pageNo - 1) * this.pageSize),
      page: this.pageNo - 1,
      pageCount: Math.ceil(Number(this.totalRecords / this.paginatorComponent._rows)),
      rows: this.pageSize
    }
    if (+this.pageNo < 0 || this.pageEvent.pageCount < +this.pageNo || +this.pageNo === 0) {
      this.pageNo = 0;
      this.messageService.showMessage({ type: 'info', title: 'Warning', body: 'Given No is bigger or lesser than total pages' });
      return
    }
    this.isPageJumpCall = true;
    this.pageChanged(this.pageEvent);
  }

}
