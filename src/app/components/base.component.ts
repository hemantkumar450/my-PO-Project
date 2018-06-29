import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/service';
import { RoleEnum } from '../shared/enums';
import { SharedService } from '../core/shared/service/shared.service';

@Component({
  selector: 'app-base-component',
  templateUrl: './base.component.html'
})

export class BaseComponent implements OnInit {

  private roleId: number;
  roleEnum = RoleEnum;
  isShowLogOut = true;
  isHeaderShow = false;
  constructor(
    private localStorageService: LocalStorageService,
    public sharedService: SharedService
  ) {
    this.sharedService.getUserDetail().subscribe(res => {
      const currentUser = res;
      this.roleId = currentUser.userRoleIds[0];
    });
  }

  ngOnInit() {
  }

}
