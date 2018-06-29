import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../core/shared/service/shared.service';

@Injectable()
export class LocalStorageService {

  constructor(private zone: NgZone, private router: Router,
    public sharedService: SharedService) {
  }

  public getCurrentUser() {
    if (localStorage.getItem('Authorization')) {
      return localStorage.getItem('Authorization');
    } else {
      return null;
    }
  }

  public getAccessToken(): string {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser;
    }
    return '';
  }

  public setCurrentUser(userDetail) {
    localStorage.removeItem('Authorization');
    localStorage.setItem('Authorization', 'bearer ' + userDetail.AccessToken);

  }

  public setProductCompare(compareList) {
    localStorage.removeItem('productCompare');
    localStorage.setItem('productCompare', JSON.stringify(compareList));
  }

  public getProductCompare() {
    return localStorage.getItem('productCompare');
  }

  public removeLogin() {
    // remove user from local storage to log user out
    localStorage.removeItem('selectedLeftMenu');
    localStorage.removeItem('productCompare');
    localStorage.removeItem('user');
    localStorage.removeItem('Authorization');
    localStorage.removeItem('leftMenuPermission');
    localStorage.removeItem('showMessage');
    // this.sharedService.isAlreadyLogin(userId).subscribe(res => {
    // });
    this.router.navigate(['./auth/login']);
  }
}
