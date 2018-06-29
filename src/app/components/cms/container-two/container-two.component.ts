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
  selector: 'app-container-two',
  templateUrl: './container-two.component.html',
  styleUrls: ['./container-two.component.css']
})

export class ContainerTwoComponent implements OnInit {
  @Input() cmsDetail: CmsModel;
  @Input() cmsPermission;
  @Input() roleId;
  page = 0;
  scrollDistance = 1;
  totalRecords: number;
  pagingDetail: any;
  filterText: string;
  showContent = false;
  isDisabled = false;
  pageSize: number = PaginationEnum.PageSize;
  products: Array<any> = [];
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
    this.getProduct();

  }

  onAttachmentSelect(attachmentDetail) {
    /* save attachment when upload image */
    const fileBrowser = this.fileInput.nativeElement;
    const formData = new FormData();
    if (fileBrowser.files) {
      for (const file of fileBrowser.files) {
        formData.append(file.name, file);
      }
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
        //  res.attachmentPath = res.attachmentPath.replace(/\\/g, '/');
        res.attachmentId = res.id;
        this.cmsDetail.attachments.splice(this.cmsDetail.attachments.length, -1, res);
      });
    });
  }

  remove(file) {
    file.isDeleted = true;
  }

  getProduct(): void {
    /* get product details list to show it product list popup  */

    this.cmsService.getProductList(this.paginationService.getParams()).subscribe(res => {
      const product = this.cmsDetail.products;
      res.data.map(productDetails => {
        const findProductIndex = this.cmsDetail.products.findIndex(pr => {
          return pr.id === productDetails.id && pr.isChecked === true;
        });
        if (findProductIndex !== -1) {
          productDetails.isChecked = true;
        } else {
          productDetails.isChecked = false;
        }
      });
      this.products = res.data;
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


  onPressDelete(category) {
    /* set isChecked and isfinallySubmitted false when product delete from final product list */
    category.isChecked = false;
    category.isfinallySubmitted = false;
    const findIndex = this.products.findIndex(pr => {
      return pr.id === category.id;
    });
    if (findIndex !== -1) {
      this.products[findIndex].isChecked = false;
    }

  }
  submitCategory() {
    /*submit product and validate product should be equal to six*/
    const productCount = this.getSelectedProductLength();
    if (productCount === 6) {
      this.cmsDetail.products.map(res => {
        if (res.isChecked === true) {
          res.isfinallySubmitted = true;
        } else {
          res.isfinallySubmitted = false;
        }
      });
      this.showContent = false;
    } else {
      this.messageService.showMessage({ type: 'error', title: '', body: 'Please select six products !' });
    }
  }

  getSelectedProductLength() {
    /* return selected product length */
    const productCount = this.cmsDetail.products.filter(product => {
      return product.isChecked === true;
    });
    return productCount.length;
  }

  onShowProducts(): void {
    /* to show popup */
    this.showContent = true;
  }
  onClickProductFromProductList(categoryDetails): void {
    /* make isChecked true on selected product */
    const findIndex = this.cmsDetail.products.findIndex(pr => {
      return pr.id === categoryDetails.id;
    });
    if (categoryDetails.isChecked) {

      if (findIndex !== -1) {
        this.cmsDetail.products[findIndex].isChecked = true;
      } else {
        categoryDetails.isfinallySubmitted = false;
        categoryDetails.isChecked = true;
        this.cmsDetail.products.splice(this.cmsDetail.products.length, -1, categoryDetails);
      }

    } else {
      if (findIndex !== -1) {
        this.cmsDetail.products[findIndex].isChecked = false;
      }

    }

  }

  onCloseSelectedProduct(categoryDetails): void {
    /* make isChecked false on close selected product  */
    const findIndex = this.products.findIndex(pr => {
      return pr.id === categoryDetails.id;
    });
    const findProductIndex = this.cmsDetail.products.findIndex(pr => {
      return pr.id === categoryDetails.id;
    });
    if (findProductIndex !== -1) {
      this.cmsDetail.products[findProductIndex].isChecked = false;
    }
    if (findIndex !== -1) {
      this.products[findIndex].isChecked = false;
    }
  }
  onClickFile(e) {
    /* filtered attachemnt length and check whether attachement is more than one or not  */
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
    this.getProduct();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getProduct();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginationService.setPageChange(this.pageEvent);
    this.paginationService.setFilterValues(event.filters);
    this.getProduct();
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
