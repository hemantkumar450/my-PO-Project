import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';;
import { VendorDetailComponent } from './vendor-detail/vendor-detail.compoent';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { VendorRegisterModel } from './shared/vendor-register.model';
import { VendorRegistrationService } from './shared/vendor-register.service';
import { MessageService } from '../../shared/message/messageService.service';
import { StatusTypeEnum, StatusEnum, SubAdminPermission, RoleEnum } from '../../shared/enums';
import { RolePermission } from '../../components/vendor/shared';
import { LeftMenuService } from '../../core/shared/left-menu/left-menu.service';

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VendorRegistrationComponent implements OnInit {
  items = [];
  vendorRegisterModel: VendorRegisterModel = new VendorRegisterModel();
  @ViewChild(VendorDetailComponent) vendorDetail: VendorDetailComponent;
  @ViewChild(ContactDetailComponent) contactDetail: ContactDetailComponent;
  @ViewChild(AccountDetailComponent) accountDetail: AccountDetailComponent;
  activeIndex: number = 0;
  activeTab: number = 1;
  countries = [];
  organisationtype = [];
  errorOnPage = false;
  vendorId = 0;
  isShow = false;
  isHeaderShow = true;
  leftMenues = [];
  rolePermission: RolePermission = new RolePermission();
  isCaptchaValid = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService,
    public leftMenuService: LeftMenuService,
    public vendorRegistrationService: VendorRegistrationService,

  ) {
  }

  ngOnInit() {
    this.step();
    this.vendorId = +this.route.snapshot.params['id'];
    if (this.vendorId > 0) {
      this.getVendorDetailById();
      this.getPermission();
    } else {
      this.vendorId = 0;
    }
    this.getCountries();
    this.getOrganisationType();

  }

  getVendorDetailById() {
    this.isShow = true;
    this.vendorRegistrationService.getVendorDetailById(this.vendorId).subscribe(vendorDetail => {
      if (vendorDetail) {
        this.vendorRegisterModel = vendorDetail;
      }
    });
  }

  getCountries(): void {
    /* get Country type List */
    this.vendorRegistrationService.getCountries().subscribe(result => {
      result.forEach(res => {
        this.countries.splice(this.countries.length, -1, { label: res.countryName, value: res.id });
      });
    });
  }

  getOrganisationType(): void {
    /* get Organisation type List */
    this.vendorRegistrationService.getOrganisationType().subscribe(result => {
      result.forEach(res => {
        this.organisationtype.splice(this.organisationtype.length, -1, { label: res.name, value: res.id });
      });
    });
  }

  changeStatus(status) {
    /* changes status of vendor registartion by admin or sub admin  */
    if (status === 'accept') {
      this.vendorRegisterModel.vendorStatusId = StatusEnum.Approved;
    } else {
      this.vendorRegisterModel.vendorStatusId = StatusEnum.Declined;
    }

    this.vendorRegistrationService.upDateSatus(this.vendorRegisterModel).subscribe(res => {
      if (res) {
        this.messageService.showMessage({ type: 'success', title: 'Vendor', body: 'Update Successfully' });
        this.router.navigate(['admin/vendors']);
      }
    });
  }

  back() {
    this.router.navigate(['admin/vendors']);
  }

  step() {
    this.items = [{
      label: 'Vendor Detail',
      command: (event: any) => {
      }
    },
    {
      label: 'Contact Detail',
      command: (event: any) => {
      }
    },
    {
      label: 'Account Detail',
      command: (event: any) => {
      }
    }
    ];
  }



  next() {
    /* this function check validation in all step before submit */

    if (this.activeTab === 1) {
      this.errorOnPage = this.vendorDetail.checkValidation();
    }

    if (this.activeTab === 2) {
      this.errorOnPage = this.contactDetail.checkValidation();
    }

    if (this.activeTab === 3) {
      this.errorOnPage = this.accountDetail.checkValidation();
    }

    if (!this.errorOnPage && this.activeTab !== 3) {
      /* if return false then it go to next tab */
      this.activeTab++;
      this.activeIndex++;
      this.step();
    }
  }

  submit() {
    /* save the vendor registration detail if no error return */
    this.next();
    if (!this.errorOnPage) {
      this.vendorRegistrationService.registerVendor(this.vendorRegisterModel).subscribe(result => {
        if (result) {
          this.messageService.showMessage({ type: 'success', title: 'Vendor Registration', body: 'Register Successfully !' });
          this.router.navigate(['./auth/login']);
        }
      });
    }

  }

  activeIndexChange(event) {
    /*  this  function show which step or component show according to validation  */
    if (event === 0) {
      this.activeIndex = 0;
      this.activeTab = 1;

    }
    if (event === 1) {
      this.next();
      if (!this.errorOnPage) {
        this.activeIndex = 1;
        this.activeTab = 2;
      } else if (this.errorOnPage && this.activeIndex === 1) {
        this.activeIndex = 1;
        this.activeTab = 2;
      } else if (this.errorOnPage && this.activeIndex === 2) {
        this.activeIndex = 1;
        this.activeTab = 2;
      } else {
        this.activeIndex = 0;
        this.activeTab = 1;
      }
    }
    if (event === 2) {
      this.next();
      if (this.errorOnPage && this.activeIndex === 1) {
        this.activeIndex = 1;
        this.activeTab = 2;
      } else if (this.errorOnPage && this.activeIndex === 0) {
        this.activeIndex = 0;
        this.activeTab = 1;
      } else {
        this.activeIndex = 2;
        this.activeTab = 3;
      }
    }
  }

  getPermission(): void {
    this.leftMenuService.getLeftMenu().subscribe(leftMenu => {
      this.leftMenues = leftMenu;
    });
    // this.leftMenues = JSON.parse(localStorage.getItem('leftMenuPermission'));
    if (this.leftMenues && this.leftMenues.length > 0) {
      this.leftMenues.map(menu => {
        if (menu.id === SubAdminPermission.Vendor &&
          menu.roleId === RoleEnum.SubAdmin || menu.roleId === RoleEnum.Admin) {
          this.rolePermission = menu;
        }
      });
    }
  }

  handleCorrectCaptcha(item) {
    if (item) {
      this.isCaptchaValid = true;
    }
  }
}
