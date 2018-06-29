import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorRegisterModel, FileModel } from '../shared/vendor-register.model';
import { VendorRegistrationService } from '../shared/vendor-register.service';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { MessageService } from '../../../shared/message/messageService.service';
import { LocalStorageService } from '../../../shared/service';
import { ApiUrl } from '../../../shared/api.service';
import { SharedService } from '../../../core/shared/service/shared.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.compoent.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  fileCompanyProfile: any = {};
  fileCompanyRegistration: any = {};
  fileOrgChart: any = {};
  fileSmeCerticate: any = {};
  @Input() organisationtype: any;
  @Input() countries: any;
  @Input() vendorRegisterModel: VendorRegisterModel;  /*  get model value from Parent  */
  @Input() disabled: boolean;
  tempDropdown = [{ label: 'Yes', value: true }, { label: 'No', value: false }];
  formData = new FormData();
  dateTime = new Date();
  roleId: number;
  vendorId = 0;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService,
    private vendorRegistrationService: VendorRegistrationService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    public sharedService: SharedService
  ) {
    this.dateTime.setDate(this.dateTime.getDate());
    this.vendorId = +this.route.snapshot.params['id'];
    if (this.vendorId > 0) {
      this.sharedService.getUserDetail().subscribe(res => {
        const currentUser = res;
        this.roleId = currentUser.userRoleIds[0];
      });
    }
  }

  ngOnInit() {



    /* binding attachment URL when admin or sub admin visit vendor registration  */
    if (this.vendorRegisterModel.id > 0) {
      this.vendorRegisterModel.dateOfEstablishment = new Date(this.vendorRegisterModel.dateOfEstablishment);
      this.vendorRegisterModel.attachments.forEach(res => {
        if (res.id === this.vendorRegisterModel.compProfileAttachId) {
          this.fileCompanyProfile.attachmentName = res.attachmentUrl;
          this.fileCompanyProfile.fileName = res.attachmentName;
          return;
        }
        if (res.id === this.vendorRegisterModel.compRegAttachId) {
          this.fileCompanyRegistration.attachmentName = res.attachmentUrl;
          this.fileCompanyRegistration.fileName = res.attachmentName;
          return;
        }
        if (res.id === this.vendorRegisterModel.orgChartAttachId) {
          this.fileOrgChart.attachmentName = res.attachmentUrl;
          this.fileOrgChart.fileName = res.attachmentName;
          return;
        }
        if (res.id === this.vendorRegisterModel.smeRegAttachId) {
          this.fileSmeCerticate.attachmentName = res.attachmentUrl;
          this.fileSmeCerticate.fileName = res.attachmentName;
          return;
        }
      });
    }
  }

  file(url) {
    /* this function for open attached URL */
    window.open(url);
  }

  checkDate(event) {
    /* check validation of calender ; selected date not be greater than today */

    const date = new Date(event);
    const todayDate = new Date();
    if (date > todayDate) {
      this.vendorRegisterModel.dateOfEstablishment = todayDate;
    }
  }

  upload(files, name) {
    /* upload files or images  */

    const formd = new FormData();
    for (let file of files) {
      formd.append(file.name, file);
    }
    let url = ApiUrl.baseUrl;
    const uploadReq = new HttpRequest('POST', url + `Attachment/VendorRegistrationUpload/0/` + name,
      formd, {});
    this.http.request(uploadReq).subscribe(result => {
      let res: any = result;
      if (res.body && name === 'CompanyProfile') {
        this.fileCompanyProfile = res.body;
        this.vendorRegisterModel.compProfileAttachId = this.fileCompanyProfile.id;
      }
      if (res.body && name === 'CompanyLicence') {
        this.fileCompanyRegistration = res.body;
        this.vendorRegisterModel.compRegAttachId = this.fileCompanyRegistration.id;
      }
      if (res.body && name === 'OrganisationChart') {
        this.fileOrgChart = res.body;
        this.vendorRegisterModel.orgChartAttachId = this.fileOrgChart.id;
      }
      if (res.body && name === 'SMECertificate') {
        this.fileSmeCerticate = res.body;
        this.vendorRegisterModel.smeRegAttachId = this.fileSmeCerticate.id;
      }
    });
  }

  checkValidation() {
    /* this function check validation and return true (if valid) to parent for next step */

    let errorCount = 0;
    if (!this.vendorRegisterModel.vendorName || this.vendorRegisterModel.vendorName === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.address1 || this.vendorRegisterModel.address1 === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.city || this.vendorRegisterModel.city === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.zipCode || this.vendorRegisterModel.zipCode === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.countryId || this.vendorRegisterModel.countryId === 0) {
      errorCount++;
    }
    if (!this.vendorRegisterModel.compProfileAttachId || this.vendorRegisterModel.compProfileAttachId === 0) {
      errorCount++;
    }
    if (!this.vendorRegisterModel.orgChartAttachId || this.vendorRegisterModel.orgChartAttachId === 0) {
      errorCount++;
    }
    if (!this.vendorRegisterModel.compRegAttachId || this.vendorRegisterModel.compRegAttachId === 0) {
      errorCount++;
    }
    if (!this.vendorRegisterModel.orgTypeId || this.vendorRegisterModel.orgTypeId === 0) {
      errorCount++;
    }
    if (!this.vendorRegisterModel.companyRegNo || this.vendorRegisterModel.companyRegNo === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.vatRegistrationNo || this.vendorRegisterModel.vatRegistrationNo === '') {
      errorCount++;
    }

    if (errorCount > 0) {
      this.messageService.showMessage({ type: 'warning', title: 'Vendor Registration', body: 'Please fill the mandatory fields' });

      return true;

    } else {
      return false;
    }

  }

}
