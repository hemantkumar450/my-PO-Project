import { Component, OnInit } from '@angular/core';
import { PasswordModel } from './model/password.model';
import { MessageService } from '../../../shared/message/messageService.service';
import { PasswordService } from './service/password.service';
import { SharedService } from '../../../core/shared/service/shared.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    passwordModel: PasswordModel = new PasswordModel();
    passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#%*?&])[A-Za-z\d$@$!#%*?&]{8,15}/;
    constructor(
        private messageService: MessageService,
        private passwordService: PasswordService,
        private sharedService: SharedService
    ) { }

    ngOnInit() {
        this.sharedService.getUserDetail().subscribe(res => {
            const currentUser = res;
            this.passwordModel.email = currentUser.Email;
            this.passwordModel.userName = currentUser.UserName;
        });
    }

    onSave() {
        if (this.passwordModel.userPwd === '') {
            this.messageService.showMessage({
                type: 'error', title: 'Password',
                body: 'Old password should can not be blank'
            });
            return;
        }
        if (!this.passwordPattern.test(this.passwordModel.userPwd)) {
            this.messageService.showMessage({
                type: 'error', title: 'Password',
                body: 'password should contain atleast one capital litter , atleast one number and one special character and should Be between 8 & 16  Character'
            });
            return;
        }
        if (this.passwordModel.newPassword === '') {
            this.messageService.showMessage({
                type: 'error', title: 'Password',
                body: 'New password should can not be blank'
            });
            return;
        }
        if (!this.passwordPattern.test(this.passwordModel.newPassword)) {
            this.messageService.showMessage({
                type: 'error', title: 'Password',
                body: 'password should contain atleast one number and one special character'
            });
            return;
        }

        if (this.passwordModel.newPassword !== this.passwordModel.confirmPassword) {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: 'New Password And Confirm Password Mismatch' });
            return;
        }
        this.passwordService.onPasswordUpdate(this.passwordModel).subscribe((response) => {
            this.messageService.showMessage({
                type: 'success', title: 'success',
                body: 'Password Successfull Changed'
            });
        });
    }
}
