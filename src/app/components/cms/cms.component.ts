import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CmsModel } from './shared/cms.model';
import { CmsService } from './shared/cms.service';
import { LeftMenuService } from '../../core/shared/left-menu/left-menu.service';
import { SharedService } from '../../core/shared/service/shared.service';
@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html'
})
export class CmsComponent implements OnInit {
  cms: Array<CmsModel> = new Array<CmsModel>();
  leftMenues = [];
  cmsPermission;
  roleId: number;
  constructor(private cmsService: CmsService,
    public leftMenuService: LeftMenuService,
    protected router: Router,
    public sharedService: SharedService
  ) {
    this.sharedService.getUserDetail().subscribe(res => {
      const currentUser = res;
      this.roleId = currentUser.userRoleIds[0];
    });
  }

  ngOnInit() {
    this.getCmsDetails();
    this.getPermission();
  }

  getCmsDetails(): void {
    /* get all cms details list for showing on grid */
    this.cmsService.getCms().subscribe((cms: Array<CmsModel>) => {
      this.cms = cms;
    });
  }

  onClickCms(cmdDetail): void {
    /* navigate route on click edit button */
    this.router.navigate(['admin/home-page-cms/' + cmdDetail.id + '/edit']);
  }

  getPermission(): void {
    /* get permission based on role */
    this.leftMenuService.getLeftMenu().subscribe(leftMenu => {
      this.leftMenues = leftMenu;
      if (this.leftMenues.length > 0) {
        this.cmsPermission = {};
        this.leftMenues.map(menu => {
          if (menu.id === 11) {
            this.cmsPermission = menu;
          }
        });
      }
    });
    // this.leftMenues = JSON.parse(localStorage.getItem('leftMenuPermission'));
  }

}
