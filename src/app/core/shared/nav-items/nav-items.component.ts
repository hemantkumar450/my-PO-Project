import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../shared/service';
import { RoleEnum } from '../../../shared/enums';
import { UserModel } from '../../../components/user/user.model';
import { MessageService } from '../../../shared/message/messageService.service';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../../shared/service/common.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.css']
})

export class NavItemsComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  isPDU = false;
  userDetails: UserModel = new UserModel();
  userName: string = '';
  compareCount: number = 0;
  private subscription: Subscription;

  constructor(private router: Router,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    public sharedService: SharedService
  ) {
    this.sharedService.getUserDetail().subscribe(res => {
      this.userDetails = res;
      if (this.userDetails.userRoleIds[0] === RoleEnum.PDU) {
        this.isPDU = true;
      }
    });
  }

  ngOnInit() {
    this.items = [{
      label: 'Hello ' + this.userDetails.firstName,
      items: [
        { label: 'My Account', icon: 'fa fa-user' },
        { label: 'logout', icon: 'fa fa-sign-out', command: (onclick) => { this.logout() } },
      ]
    }];

    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'setProductCompareObj') {
        this.setProductCompare(res.value);
      }
      if (res.hasOwnProperty('option') && res.option === 'setNavBarCountEvent') {
        this.compareCount = res.value;
      }
    });
    this.compareCount = this.checkLocalStorageProductList().length;
  }

  onMyAccountClick() {
    this.router.navigate(['/user/dashboard']);
  }

  checkLocalStorageProductList() {
    let compareList: any = this.localStorageService.getProductCompare();
    return compareList === null ? [] : JSON.parse(compareList);
  }

  setProductCompare(list) {
    let compareList = this.checkLocalStorageProductList();
    compareList.splice(compareList.length, 0, list);
    this.compareCount = compareList.length;
    this.localStorageService.setProductCompare(compareList);
  }

  redirectOnCompare() {
    let compareList = this.checkLocalStorageProductList();
    this.router.navigate(['/product/compare']);
  }

  logout() {
    this.localStorageService.removeLogin();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickMyAccount() {
    this.router.navigate(['/user/account/dashboard']);
  }

}
