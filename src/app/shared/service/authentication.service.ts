import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ApiUrl } from '../api.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  // public login(username: string, password: string): Promise<ObjectResponseModel<Token>> {
  //   let logInfo = JSON.stringify({ Email: username, Password: password });
  //   let promise = this.http
  //     .post(ApiUrl.LOGIN_URI + 'login', logInfo)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<Token>>(promise);
  // }

  // public changeLab(labId: number): Promise<ObjectResponseModel<Token>> {
  //   let promise = this.http
  //     .post(ApiUrl.LOGIN_URI + 'changelab/' + labId, null)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<Token>>(promise);
  // }

  // public CheckOldPassword(oldPassword: string): Promise<ObjectResponseModel<string>> {
  //   let promise = this.http
  //     .get('loginservice/User/checkOldPassword/' + oldPassword)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<string>>(promise);
  // }

  // public UpdatePassword(oldPassword: string, password: string): Promise<PostObjectResponseModel<string>> {
  //   let promise = this.http
  //     .put('securityservice/User/changePassword/' + oldPassword + '/' + password, null)
  //     .toPromise();
  //   return new PromiseHandler<PostObjectResponseModel<string>>(promise);
  // }

  // public ResetPasswordLink(email: string): Promise<ObjectResponseModel<string>> {
  //   let promise = this.http
  //     .post('securityservice/Account/verifyUser/' + email, null)
  //     .toPromise();
  //   return new PromiseHandler<PostObjectResponseModel<string>>(promise);
  // }

  // public ResetPassword(token: string, password: string): Promise<ObjectResponseModel<string>> {
  //   let promise = this.http
  //     .put('securityservice/Account/resetPassword/' + token + '/' + password, null)
  //     .toPromise();
  //   return new PromiseHandler<PostObjectResponseModel<string>>(promise);
  // }

  // public CheckToken(url: string): Promise<ObjectResponseModel<ResetPasswordModel>> {
  //   let promise = this.http
  //     .get('securityservice/Account/verifytoken/' + url)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<ResetPasswordModel>>(promise);
  // }
}
