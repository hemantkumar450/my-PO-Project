import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { MessageService } from '../../shared/message/messageService.service';
import { AuthService } from '../auth.service';
import { LoginModel, FogotPasswordModel } from '../auth.model';
import { LocalStorageService } from '../../shared/service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotComponent implements OnInit {
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#%*?&])[A-Za-z\d$@$!#%*?&]{8,15}/;
  isReset: boolean = false;
  emailId: string = '';
  token: string = '';
  isEmailSent: boolean = false;
  isTokenExpired: boolean = false;
  password: string = '';
  rePassword: string = '';
  constructor(
    private messageService: MessageService,
    private router: Router,
    public route: ActivatedRoute,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.route.snapshot.queryParams['token'] === undefined ? '' : this.route.snapshot.queryParams['token'];
    this.emailId = this.route.snapshot.queryParams['email'] === undefined ? '' : this.route.snapshot.queryParams['email'];;
    if (this.token.trim() !== '') {
      this.isReset = true;
      this.tokenVerify();
    }
  }

  ngOnInit() { }

  tokenVerify() {
    this.authService.tokenVerify(this.emailId, this.token).subscribe(result => {
    }, error => {
      this.isTokenExpired = true;
    });
  }

  onSubmit() {
    if (!this.emailId || this.emailId === '') {
      this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Enter username or email' });
      return;
    }
    this.authService.forgotPassword(this.emailId).subscribe(result => {
      this.isEmailSent = result;
    });
  }

  onResetPassword() {
    if (!this.passwordPattern.test(this.password)) {
      this.messageService.showMessage({
        type: 'error', title: 'Error',
        body: 'password should contain atleast one capital litter , atleast one number and one special character and should Be between 8 & 16  Character'
      });
      return;
    }

    if (this.password.trim() === '' || this.password !== this.rePassword) {
      this.messageService.showMessage({ type: 'error', title: 'Error', body: 'password does not match with re password' });
      return;
    }
    const obj = {
      email: this.emailId,
      userPwd: this.password
    };
    this.authService.resetPassword(obj).subscribe(result => {
      if (result) {
        this.messageService.showMessage({ type: 'success', title: 'Password', body: 'Set successfully !!!' });
        this.backToLogin();
      }
    });
  }

  backToLogin() {
    this.router.navigate(['./auth/login']);

  }



}
