import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Category } from '../../product';
import { CmsModel, AttachmentModel } from '../shared/cms.model';

import { CategoryService } from '../../categories/shared/categories.service';
import { SegementModel } from '../../categories/shared/categories.model';
import { PaginationService } from '../../../shared/service/pagination.service';
import { LocalStorageService } from '../../../shared/service/local-storage.service';
import { ApiUrl } from '../../../shared/api.service';
import { CmsService } from '../shared/cms.service';
import { MessageService } from 'src/app/shared/message/messageService.service';

@Component({
  selector: 'app-container-one',
  templateUrl: './container-one.component.html',
  styleUrls: ['./container-one.component.css']
})

export class ContainerOneComponent implements OnInit {
  @Input() cmsDetail: CmsModel;
  @Input() cmsPermission;
  @Input() roleId;
  scrollDistance = 1;

  totalRecords: number;
  pagingDetail: any;
  filterText: string;
  isDisabled = false;
  categories: Array<any> = [];
  showContent = false;

  @ViewChild('fileInput') fileInput;
  constructor(private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
    private paginationService: PaginationService,
    private cmsService: CmsService,
    private http: HttpClient,
    private messageService: MessageService) { }


  ngOnInit() {
    this.pagingDetail = this.paginationService.getParamsForAutoScroll();
    this.getSegment();
  }
  onShowCatergories(): void {
    /* to show popup */
    this.showContent = true;
  }
  onCloseCategory(categoryDetails) {
    /* set isChecked false when close selected category  */
    const findIndex = this.categories.findIndex(pr => {
      return pr.id === categoryDetails.id;
    });
    const findProductIndex = this.cmsDetail.categories.findIndex(pr => {
      return pr.id === categoryDetails.id;
    });
    if (findProductIndex !== -1) {
      this.cmsDetail.categories[findProductIndex].isChecked = false;
    }
    if (findIndex !== -1) {
      this.categories[findIndex].isChecked = false;
    }

  }


  onClickCategory(categoryDetails): void {
    /* make isChecked false when select category from category list container */
    categoryDetails.isChecked = !categoryDetails.isChecked;
    const findIndex = this.cmsDetail.categories.findIndex(pr => {
      return pr.id === categoryDetails.id;
    });
    if (categoryDetails.isChecked) {

      if (findIndex !== -1) {
        this.cmsDetail.categories[findIndex].isChecked = true;
      } else {
        categoryDetails.isfinallySubmitted = false;
        categoryDetails.isChecked = true;
        this.cmsDetail.categories.splice(this.cmsDetail.categories.length, -1, categoryDetails);
      }

    } else {
      if (findIndex !== -1) {
        this.cmsDetail.categories[findIndex].isChecked = false;
      }

    }
  }

  getSegment(): void {
    /* get all categories detail  */

    this.categoryService.getSegments(this.pagingDetail).subscribe(res => {
      const category = this.cmsDetail.categories;

      res.data.map(productDetails => {
        const findProductIndex = this.cmsDetail.categories.findIndex(pr => {
          return pr.id === productDetails.id && pr.isChecked === true;
        });
        if (findProductIndex !== -1) {
          productDetails.isChecked = true;
        } else {
          productDetails.isChecked = false;
        }
        this.categories.splice(this.categories.length, -1, productDetails);
      });

      this.totalRecords = res.totalRecords;

    });
  }


  onScrollDown(): void {
    /* call function when scroll down*/
    this.setPageContent();
  }

  setPageContent() {
    /* set start page no when scroll down */
    if (this.cmsDetail.categories.length > 0 && this.cmsDetail.categories.length < this.totalRecords) {
      this.pagingDetail.StartPageNo = this.pagingDetail.StartPageNo + 1;
      this.getSegment();

    }
  }

  onKeyPressCategorySearch() {
    /* set filtered value on segmentName for filtering categories on popup */
    const searchText = this.filterText.trim().length;
    if ((searchText > 2 || searchText === 0)) {
      this.pagingDetail.StartPageNo = 1;
      this.categories = [];
      this.pagingDetail['SegmentName'] = this.filterText.trim();
      this.getSegment();
    }
  }


  onAttachmentSelect(attachmentDetail) {
    /* save attachment when attachment select */
    const fileBrowser = this.fileInput.nativeElement;
    const formData = new FormData();
    if (fileBrowser.files) {

      for (const file of fileBrowser.files) {
        formData.append(file.name, file); /* append image inside fordata */
      }


      const access_token = this.localStorageService.getAccessToken();
      const url = ApiUrl.baseUrl;
      this.http.post(url + `Attachment/addAttachment/home-page/0`, formData, {
        headers: new HttpHeaders({
          'Authorization': `${access_token}`
        })
      }).subscribe((attachments: any) => {
        // res.attachmentPath = res.attachmentPath.replace(/\\/g, '/');
        attachments.map(res => {
          res.attachmentId = res.id;
          this.cmsDetail.attachments.splice(this.cmsDetail.attachments.length, -1, res);
        });
      });
    }
  }

  onPressDelete(category) {
    /* set isChecked false on selected category in popup window  */
    category.isChecked = false;
    category.isfinallySubmitted = false;
    const findIndex = this.categories.findIndex(pr => {
      return pr.id === category.id;
    });
    if (findIndex !== -1) {
      this.categories[findIndex].isChecked = false;
    }
  }





  submitCategory() {
    /* submit selected category from popup */
    const categoryLength = this.checkCategoryAddCriteria();
    if (categoryLength === 0) {
      this.messageService.showMessage({ type: 'error', title: '', body: 'Category should no be empty !' });
    } else if (categoryLength <= 11) {
      this.cmsDetail.categories.map(res => {
        if (res.isChecked === true) {
          res.isfinallySubmitted = true;
        } else {
          res.isfinallySubmitted = false;
        }
      });
      this.showContent = false;
    } else {
      this.messageService.showMessage({ type: 'error', title: '', body: 'Selected categories should be less than twelve !' });
    }
  }

  checkCategoryAddCriteria() {
    /* return selected categories length */
    const selectedCategory = this.cmsDetail.categories.filter((categoryDetails) => {
      return (categoryDetails.isChecked === true);
    });
    return selectedCategory.length;
  }

  remove(file) {
    /* remove attachemnt */
    file.isDeleted = true;
  }
  checkAttachmentLength() {
    /*restrict attachemnt length is equalto three*/
    const activeAttachmentCount = this.cmsDetail.attachments.filter(res => {
      return res.isDeleted === false;
    });
    if (activeAttachmentCount.length === 3) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }
}
