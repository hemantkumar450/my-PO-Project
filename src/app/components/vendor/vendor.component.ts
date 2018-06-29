import { Component, OnInit } from '@angular/core';
import { RoleEnum } from '../../shared/enums';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html'
})
export class VendorComponent implements OnInit {
  selectedTab: number = 1;
  roleId: number = 0

  constructor() {
    this.roleId = RoleEnum.Vendor
  }

  ngOnInit() {
  }
}
