import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorRegisterModel, VendorAccountsModel } from '../shared/vendor-register.model';
import { VendorRegistrationService } from '../shared/vendor-register.service';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { MessageService } from '../../../shared/message/messageService.service';
import { ApiUrl } from '../../../shared/api.service';
import { SharedService } from '../../../core/shared/service/shared.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})

export class AccountDetailComponent implements OnInit {
  formData = new FormData();
  fileCompanyProfile: any = {};
  @Input() countries: any;
  @Input() vendorRegisterModel: VendorRegisterModel; /*  get model value from Parent  */
  tempDropdown = [{ label: 'Yes', value: true }, { label: 'No', value: false }];
  tempDropdownActivity = [{ label: 'Yes', value: 1 }, { label: 'No', value: 2 }];
  @Input() disabled: boolean;
  roleId: number;
  vendorId = 0;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService,
    private vendorRegistrationService: VendorRegistrationService,
    private http: HttpClient,
    public sharedService: SharedService
  ) {
    this.vendorId = +this.route.snapshot.params['id'];
    if (this.vendorId > 0) {
      this.sharedService.getUserDetail().subscribe(res => {
        const currentUser = res;
        this.roleId = currentUser.userRoleIds[0];
      });
    }
  }

  ngOnInit() {

    if (this.vendorRegisterModel.id > 0) {
      /* binding attachment URL when admin or sub admin visit vendor registration  */
      this.vendorRegisterModel.attachments.forEach(res => {
        if (res.id === this.vendorRegisterModel.compProfileAttachId) {
          this.fileCompanyProfile.attachmentName = res.attachmentUrl;
          this.fileCompanyProfile.fileName = res.attachmentName;
          return;
        }
      });
    }

    if (this.vendorRegisterModel.vendorAccounts.length === 0) {
      const obj: VendorAccountsModel = new VendorAccountsModel();
      this.vendorRegisterModel.vendorAccounts.splice(this.vendorRegisterModel.vendorAccounts.length, 0, obj);
    }
  }



  checkValidation() {
    /* this function check validation and return true (if valid) to parent for submit */

    let errorCount = 0;
    this.vendorRegisterModel.vendorAccounts.forEach(account => {
      if (!account.bankDetails || account.bankDetails === '') {
        errorCount++;
      }
      if (!account.accountName || account.accountName === '') {
        errorCount++;
      }
      if (!account.accountNo || account.accountNo === '') {
        errorCount++;
      }
      if (!account.iban || account.iban === '') {
        errorCount++;
      }
      if (!account.swiftCode || account.swiftCode === '') {
        errorCount++;
      }
      if (!account.paymentCurrency || account.paymentCurrency === '') {
        errorCount++;
      }
      if (!account.nameOfBank || account.nameOfBank === '') {
        errorCount++;
      }
      if (!account.branchName || account.branchName === '') {
        errorCount++;
      }
      if (!account.branchZipCode || account.branchZipCode === 0) {
        errorCount++;
      }
      if (!account.branchCity || account.branchCity === '') {
        errorCount++;
      }
      if (!account.branchCountryId || account.branchCountryId === 0) {
        errorCount++;
      }
      if (!account.contact1 || account.contact1 === '') {
        errorCount++;
      }

      if (!account.contact2 || account.contact2 === '') {
        errorCount++;
      }

      if (!account.declarationName || account.declarationName === '') {
        errorCount++;
      }

      if (!account.declarationPosition || account.declarationPosition === '') {
        errorCount++;
      }
      if (account.policies === undefined) {
        errorCount++;
      }

      if (account.policies === true && this.vendorRegisterModel.vendorAccounts[0].otherPoliciesAttachmentId === 0) {
        errorCount++;
      }


    });

    if (errorCount > 0) {
      this.messageService.showMessage({ type: 'warning', title: 'Vendor Registration', body: 'Please fill the mandatory fields' });

      return true;

    } else {
      return false;
    }
  }

  upload(files, name) {
    const formd = new FormData();
    for (let file of files) {
      formd.append(file.name, file);
    }
    let url = ApiUrl.baseUrl;
    const uploadReq = new HttpRequest('POST', url + `Attachment/VendorRegistrationUpload/0/` + name,
      formd, {});
    this.http.request(uploadReq).subscribe(event => {
      let res: any = event;
      if (res.body && name === 'PolicyAttachment') {
        this.fileCompanyProfile = res.body;
        this.vendorRegisterModel.vendorAccounts[0].otherPoliciesAttachmentId = this.fileCompanyProfile.id;
      }
    });
  }

}
