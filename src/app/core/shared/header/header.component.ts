import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../shared/service';
import { UserModel } from '../../../components/user/user.model';
import { RoleEnum } from '../../../shared/enums';
import { ProductService } from '../../../components/product';
import { CoreService } from '../service/core.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  baseImgPath = '../../../../assets/images/layout/';
  @Input() isHeaderShow: boolean;
  userDetails: UserModel = new UserModel();
  roleId;
  product: string = '';
  today = new Date();
  currHr = this.today.getHours();
  msg: string;
  showMessageInterval = false;
  status;
  isLoginButtonShow = 0;
  path: string;
  @Input() isShowLogOut: boolean;
  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    public coreService: CoreService,
    public sharedService: SharedService
  ) {
    this.path = this.route.snapshot.routeConfig.path;
    if (this.path !== 'vendor-registration') {
      this.sharedService.getUserDetail().subscribe(res => {
        this.userDetails = res;
        if (this.userDetails) {
          this.isLoginButtonShow = this.userDetails.Id;
          this.roleId = this.userDetails.userRoleIds[0];
          this.showMessageBasedOnTime();
        }
      });
    }

    this.status = localStorage.getItem('showMessage');

  }

  ngOnInit() {
  }

  onClickImage() {
    this.coreService.searchKey.next('');
    if (this.roleId === RoleEnum.PDU) {
      this.router.navigate(['/home']);
    } else if (this.roleId === RoleEnum.Vendor) {
      this.router.navigate(['/vendor/shared/dashboard']);
    } else {
      this.router.navigate(['/admin/user/dashboard']);
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.localStorageService.removeLogin();
  }
  showMessageBasedOnTime() {
    if (this.currHr < 12) {
      this.msg = '<span>Good Morning <i class="fa fa-smile-o" aria-hidden="true"></i> </span><span>' + this.userDetails.firstName
        + '</span>';
    } else if (this.currHr < 18) {
      this.msg = '<span>Good Afternoon <i class="fa fa-smile-o" aria-hidden="true"></i> </span><span>' + this.userDetails.firstName
        + '</span>';
    } else {
      this.msg = '<span>Good Evening <i class="fa fa-smile-o" aria-hidden="true"></i> </span><span>' + this.userDetails.firstName
        + '</span>';

    }
    if (this.status === 'false') {
      setTimeout(() => {
        this.showMessageInterval = true;
      }, 2000);
      setTimeout(() => {
        this.showMessageInterval = false;
        localStorage.setItem('showMessage', 'true');
      }, 5000);
    }
  }
}
