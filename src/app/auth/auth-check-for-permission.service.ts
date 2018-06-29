import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { LocalStorageService } from '../shared/service';
import { RoleEnum } from '../shared/enums';
import { SharedService } from '../core/shared/service/shared.service';

@Injectable({
    providedIn: 'root'
})
export class AuthCheckForPermission implements CanActivate {
    roleId: number;
    constructor(
        private router: Router,
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        public sharedService: SharedService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.sharedService.getUserDetail().subscribe(res => {
            const currentUser = res;
            if (currentUser) {
                this.roleId = currentUser.userRoleIds[0];
                if (RoleEnum.Admin === this.roleId) {
                    this.router.navigate(['/admin/user/dashboard']);
                }
                if (RoleEnum.SubAdmin === this.roleId) {
                    this.router.navigate(['/user/account/dashboard']);
                }
                if (RoleEnum.PDU === this.roleId) {
                    this.router.navigate(['/home']);
                }
                if (RoleEnum.Vendor === this.roleId) {
                    this.router.navigate(['/vendor/shared/dashboard']);
                }
                return true;
            }
        });
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
