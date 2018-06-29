import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CmsModel } from '../shared/cms.model';
import { MessageService } from '../../../shared/message/messageService.service';
import { CmsService } from '../shared/cms.service';
import { LeftMenuService } from '../../../core/shared/left-menu/left-menu.service';
import { SharedService } from '../../../core/shared/service/shared.service';
@Component({
  selector: 'app-cms-detail',
  templateUrl: './cms-detail.component.html',
  styleUrls: ['./cms-detail.component.css']
})
export class CmsDetailComponent implements OnInit {
  cmsDetail: CmsModel = new CmsModel();
  validateContainerOne = false;
  validateProduct = false;
  roleId: number;
  leftMenues = [];
  cmsPermission;
  isCategoryCheck: boolean;
  constructor(protected route: ActivatedRoute,
    private cmsService: CmsService,
    protected router: Router,
    public leftMenuService: LeftMenuService,
    private messageService: MessageService,
    public sharedService: SharedService
  ) {
    this.sharedService.getUserDetail().subscribe(res => {
      const currentUser = res;
      this.roleId = currentUser.userRoleIds[0];
    });
    // const currentUser = JSON.parse(localStorage.getItem('user'));
    // this.roleId = currentUser.UserRoleIds[0];

  }

  ngOnInit() {
    this.cmsDetail.id = this.route.snapshot.params['cmsId'];
    this.getCmsDetail();
    this.getPermission();
  }
  private getCmsDetail(): void {
    /* get cms details based on cmsDetail id */
    this.cmsService.getCmsDetail(this.cmsDetail).subscribe(cmsDetail => {
      cmsDetail.products.map(res => {
        res.isChecked = true;
        res.isfinallySubmitted = true;
      });
      cmsDetail.vendors.map(res => {
        res.isChecked = true;
        res.isfinallySubmitted = true;
      });
      cmsDetail.categories.map(res => {
        res.isChecked = true;
        res.isfinallySubmitted = true;
      });
      this.cmsDetail = cmsDetail;
    });
  }

  private submitCategory() {
    /* save cms category details */
    if (this.cmsDetail.categories.length > 0) {
      this.cmsDetail.categories = this.cmsDetail.categories.filter(category => {
        return category.isfinallySubmitted === true;
      });
    }
    if (this.cmsDetail.products.length > 0) {
      this.cmsDetail.products = this.cmsDetail.products.filter(category => {
        return category.isfinallySubmitted === true;
      });
    }
    if (this.cmsDetail.vendors.length > 0) {
      this.cmsDetail.vendors = this.cmsDetail.vendors.filter(category => {
        return category.isfinallySubmitted === true;
      });
    }
    if (this.cmsDetail.id === 1) {
      this.validateProduct = true;
      this.validateAttachment();
      this.isCategoryCheck = this.validateCategories();
    }
    if (this.cmsDetail.id === 2 || this.cmsDetail.id === 3) {
      this.isCategoryCheck = true;
      this.validateAttachment();
      this.validateProductsCountLessThanOrEqualSix();
    }
    if (this.cmsDetail.id === 4) {
      this.isCategoryCheck = true;
      this.validateAttachment();
      this.validateVendorsCountLessThanOrEqualSix();
    }
    if (this.validateContainerOne && this.validateProduct && this.isCategoryCheck) {

      this.cmsDetail.attachments = this.cmsDetail.attachments.filter(res => {
        return res.isDeleted === false;
      });
      this.cmsService.saveCmsDetails(this.cmsDetail).subscribe(res => {
        this.back();
      });
    }
  }
  back() {
    /* Back to cms grid panel */
    this.router.navigate(['admin/home-page-cms']);
  }

  validateAttachment() {
    /* Validate attachment  */
    const activeAttachmentCount = this.cmsDetail.attachments.filter(res => {
      return res.isDeleted === false;
    });
    if (activeAttachmentCount.length === 0) {
      this.validateContainerOne = false;
      this.messageService.showMessage({ type: 'error', title: '', body: 'Attachment is required !' });
      return false;
    } else {
      this.validateContainerOne = true;
    }
  }

  validateProductsCountLessThanOrEqualSix() {
    /* validate products, which has added by users (it should be six products)*/
    const productCount = this.cmsDetail.products.filter(product => {
      return product.isChecked === true;
    });
    if (productCount.length === 6) {
      this.validateProduct = true;
    } else {
      this.validateProduct = false;
      this.messageService.showMessage({ type: 'error', title: '', body: 'Please select six products !' });

    }

  }

  validateVendorsCountLessThanOrEqualSix() {
    /* validate vendors, which has added by users (it should be six products)*/
    const productCount = this.cmsDetail.vendors.filter(product => {
      return product.isChecked === true;
    });
    if (productCount.length === 6) {
      this.validateProduct = true;
    } else {
      this.validateProduct = false;
      this.messageService.showMessage({ type: 'error', title: '', body: 'Please select six vendors !' });

    }
  }

  validateCategories() {
    /* validate categories, which has added by users (it should not be empty and less than equal 11 )*/
    const selectedCategory = this.cmsDetail.categories.filter((categoryDetails) => {
      return (categoryDetails.isfinallySubmitted === true);
    });
    if (selectedCategory.length > 12 && selectedCategory.length > 0) {
      this.messageService.showMessage({ type: 'error', title: '', body: 'Selected categories should be less than or equal to eleven !' });
      return false;
    }
    if (selectedCategory.length === 0) {
      this.messageService.showMessage({ type: 'error', title: '', body: 'Category should no be empty !' });
      return false;
    }
    return true;
  }

  getPermission(): void {
    /* to get permission based on role */
    this.leftMenuService.getLeftMenu().subscribe(leftMenu => {
      this.leftMenues = leftMenu;
    });
    // this.leftMenues = JSON.parse(localStorage.getItem('leftMenuPermission'));
    if (this.leftMenues.length > 0) {
      this.cmsPermission = {};
      this.leftMenues.map(menu => {
        if (menu.id === 11) {
          this.cmsPermission = menu;
        }
      });
    }
  }


}
