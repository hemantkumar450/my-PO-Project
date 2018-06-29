import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../shared/message/messageService.service';
import { AuthService } from '../auth.service';
import { LoginModel } from '../auth.model';
import { LocalStorageService } from '../../shared/service';
import { RoleEnum, AssertTypeEnum } from '../../shared/enums';
import { LeftMenuService } from '../../core/shared/left-menu/left-menu.service';
import { CommonService } from '../../shared/service/common.service';
import { SharedService } from '../../core/shared/service/shared.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  login: LoginModel = new LoginModel();
  userRoleId: number;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private commonService: CommonService,
    public authService: AuthService,
    private localStorageService: LocalStorageService,
    private leftMenuService: LeftMenuService,
    private sharedService: SharedService
  ) {

  }

  ngOnInit() {
    const currentUser = this.localStorageService.getCurrentUser();
    if (currentUser) {
      this.sharedService.getUserDetail().subscribe(res => {
        this.userRoleId = res.userRoleIds[0];
        if (RoleEnum.Admin === this.userRoleId) {
          this.router.navigate(['/admin/user/dashboard']);
        }
        if (RoleEnum.SubAdmin === this.userRoleId) {
          this.router.navigate(['/user/account/dashboard']);
        }
        if (RoleEnum.PDU === this.userRoleId) {
          this.router.navigate(['/home']);
        }
        if (RoleEnum.Vendor === this.userRoleId) {
          this.router.navigate(['/vendor/shared/dashboard']);
        }
      });
    }
  }

  onSignIn(isValid) {
    if (isValid) { /* isValid check form is valid or not */
      this.authService.onLogin(this.login).subscribe(result => {
        if (result.AccessToken) {
          this.localStorageService.setCurrentUser(result);
        }
        localStorage.setItem('showMessage', 'false');
        const roleId = result.User.UserRoleIds[0];
        /* navigate components according to role  */
        /* RoleEnum has multiple value */
        if (RoleEnum.Admin === roleId) {
          this.router.navigate(['/admin/user/dashboard']);
        }
        if (RoleEnum.SubAdmin === roleId) {
          this.router.navigate(['/user/account/dashboard']);
        }
        if (RoleEnum.PDU === roleId) {
          this.router.navigate(['/home']);
        }
        if (RoleEnum.Vendor === roleId) {
          this.router.navigate(['/vendor/shared/dashboard']);
        }
        this.commonService.notifyOther({ option: 'setAddCart', value: true });
      });
    }
  }

  vendorRegistration() {
    this.router.navigate(['./auth/vendor-registration']); /* redirect to vendor registration component */
  }

  forgotPassword() {
    this.router.navigate(['./auth/forgot-password']); /* redirect to forgot password component */
  }

}
