import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorRegisterModel, CompanyTurnoversModel } from '../shared/vendor-register.model';
import { MessageService } from '../../../shared/message/messageService.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  tempDropdown = [{ label: 'Yes', value: true }, { label: 'No', value: false }];
  companyTurnOver: Array<CompanyTurnoversModel> = [];
  @Input() vendorRegisterModel: VendorRegisterModel;
  @Input() disabled: boolean;
  count = 0;
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService
  ) {
  }
  ngOnInit() {
    if (this.vendorRegisterModel.companyTurnovers.length === 0) {
      this.vendorRegisterModel.companyTurnovers.push({
        id: 0, vendorId: 0, year: '',
        organisationAnnualTurnOver: '', groupAnnualTurnOver: ''
      });
    }
  }

  checkValidation() {
    /* this function check validation and return true (if valid) to parent for next step */
    let errorCount = 0;
    if (!this.vendorRegisterModel.companyOwner || this.vendorRegisterModel.companyOwner === '') {
      errorCount++;
    }
    if (!this.emailPattern.test(this.vendorRegisterModel.email)) {
      this.messageService.showMessage({ type: 'warning', title: 'Vendor Registration', body: 'Invalid Email Format' });

      errorCount++;
    }
    if (!this.vendorRegisterModel.passportNo || this.vendorRegisterModel.passportNo === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.contactPersonName || this.vendorRegisterModel.contactPersonName === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.position || this.vendorRegisterModel.position === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.email || this.vendorRegisterModel.email === '') {
      errorCount++;
    }
    if (!this.vendorRegisterModel.mobileNo || this.vendorRegisterModel.mobileNo === '') {
      errorCount++;
    }

    if (this.vendorRegisterModel.convictions === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.bankruptcy === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.professionalMisconduct === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.competition === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.deficienciesInPerformance === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.misleadingInfo === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.conductOfBusiness === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.financialStatus === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.associationWithEmaarSupplier === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.associationWithEmaarSupplier === true && this.vendorRegisterModel.associationWithEmaarSupplierYes === '') {
      errorCount++;
    }

    if (this.vendorRegisterModel.conflictOfInterest1 === undefined) {
      errorCount++;
    }
    if (this.vendorRegisterModel.conflictOfInterest1 === true && this.vendorRegisterModel.conflictOfInterest1Yes === '') {
      errorCount++;
    }

    this.vendorRegisterModel.companyTurnovers.forEach(turnOver => {
      /* check validation of Company TurnOver , any field not be blank before proceeding , set atleast One year data */

      if (turnOver.groupAnnualTurnOver === '' || turnOver.organisationAnnualTurnOver === '' || turnOver.year === '') {
        this.messageService.showMessage({
          type: 'warning', title: 'Vendor Registration',
          body: 'Company Turnover can not blank Or Atleast provide one year turn over '
        });
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

  addTurnOver() {
    this.vendorRegisterModel.companyTurnovers.forEach(res => {
      /* add new row of company turnover table but not be more than three */
      if (res.groupAnnualTurnOver === '' || res.organisationAnnualTurnOver === '' || res.year === '') {
        return;
      } else {
        this.count++;

        let obj = { id: 0, vendorId: 0, year: '', organisationAnnualTurnOver: '', groupAnnualTurnOver: '' };
        if (this.count < 3) {
          this.vendorRegisterModel.companyTurnovers.push(obj);
        } else {
          this.count = 2;
        }
      }
    });

  }

  deleteRow(index) {
    /* delete company turnover row  */
    this.vendorRegisterModel.companyTurnovers.splice(index, 1);
    this.count--;
  }



}
