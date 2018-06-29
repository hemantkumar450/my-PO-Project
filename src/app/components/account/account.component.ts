import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/service';
import { RoleEnum } from '../../shared/enums';
import { SharedService } from '../../core/shared/service/shared.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  roleId: number;
  roleEnum = RoleEnum;
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
