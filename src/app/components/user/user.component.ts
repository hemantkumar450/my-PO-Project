import { Component, OnInit } from '@angular/core';
import { RoleEnum } from '../../shared/enums';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  selectedTab: number = 1;
  roleId: number = 0;
  constructor() {
    this.roleId = RoleEnum.PDU;
  }

  ngOnInit() {

  }

  onTabSelect(selectedTabId: number) {
    this.selectedTab = selectedTabId;
  }

}
