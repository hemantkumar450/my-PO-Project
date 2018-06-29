import { Component, OnInit } from '@angular/core';
import { ProfileModel, AttachmentModel, UserPermissionModel } from './model/profile-detail.model';
import { ProfileDetailsService } from './service/profile-detail.service';
import { MessageService } from '../../../shared/message/messageService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleEnum, SubAdminPermission } from '../../../shared/enums';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { ApiUrl } from '../../../shared/api.service';
import { LocalStorageService } from '../../../shared/service';
import { RolePermission } from '../../vendor/shared';
import { LeftMenuService } from '../../../core/shared/left-menu/left-menu.service';
import { CoreService } from '../../../core/shared/service/core.service';
import { CommonService } from '../../../shared/service/common.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { SharedService } from '../../../core/shared/service/shared.service';

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})

export class ProfileDetailComponent implements OnInit {
    profileModel: ProfileModel = new ProfileModel();
    roles: Array<any> = [];
    selectedRole: any
    userPermissions: Array<UserPermissionModel> = [];
    selectedRoleId: number = 3; // 3 is for PDU user role and this is by default selected
    isAdmin: boolean = false;
    currentLoggedUser: any
    formData = new FormData();
    isRoleDDoDisabled: boolean = false;
    path: string = '';
    header: string = '';
    isShowCancelButton: boolean = false;
    leftMenues = [];
    rolePermission: RolePermission = new RolePermission();
    userRoleId: number = 0;
    isSelfProfileEdit: boolean = false;

    constructor(private profileService: ProfileDetailsService,
        protected route: ActivatedRoute,
        private messageService: MessageService,
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private commonService: CommonService,
        private router: Router,
        public coreService: CoreService,
        public leftMenuService: LeftMenuService,
        public loaderService: LoaderService,
        public sharedService: SharedService
    ) {
        this.profileService.gerRoleDDO().subscribe(res => {
            res.map((data) => {
                const obj = { label: data.roleName, value: data.id }
                this.roles.push(obj);
            });
        });
    }

    ngOnInit() {
        this.profileModel.id = this.route.snapshot.params['id'] || 0;
        this.path = this.route.snapshot.routeConfig.path;
        this.sharedService.getUserDetail().subscribe(res => {
            this.userRoleId = res.userRoleIds[0];
            // this.profileModel.id = res.id;
            this.currentLoggedUser = res;

            // this.currentLoggedUser = JSON.parse(localStorage.getItem('user'));
            if (this.currentLoggedUser.userRoleIds[0] === RoleEnum.Admin) {
                this.isAdmin = true;
                this.profileService.getModuleListById().subscribe((result) => {
                    this.userPermissions = result;
                });
            }
            if (this.currentLoggedUser.userRoleIds[0] === RoleEnum.Admin || this.currentLoggedUser.userRoleIds[0] === RoleEnum.SubAdmin) {
                this.isShowCancelButton = true;
            }
            if (this.path === 'edit-profile') {
                this.isShowCancelButton = false;
                this.isSelfProfileEdit = true;
                this.profileModel.id = this.currentLoggedUser.id;
            }

            if (Number(this.profileModel.id) > 0 && this.path !== 'edit-profile') {
                this.getUserDetailOnEditByAdmin(this.profileModel.id);
                this.isRoleDDoDisabled = true;
                this.header = 'Edit Profile';

            } else if ((Number(this.profileModel.id) > 0 && this.path === 'edit-profile')) {
                this.getUserProfile();
            } else {
                // adding user by admin so by default status will 2 i,e. "approved"
                this.profileModel.userStatusId = 2;
                this.header = 'Add Profile';
            }
        });
        this.getPermission();
    }

    getUserDetailOnEditByAdmin(userId) {
        this.profileService.gerUserDetailById(userId).subscribe(res => {
            this.profileModel = res;
            if (res.userRoleIds.length > 0) {
                this.selectedRoleId = res.userRoleIds[0];
            }
            if (res.userPermissions.length > 0) {
                this.userPermissions = res.userPermissions;
            }
            this.profileModel.attachment = new AttachmentModel();
        });
    }

    getUserProfile() {
        this.profileService.getUserProfile().subscribe(res => {
            this.profileModel = res;
            if (res.userRoleIds.length > 0) {
                this.selectedRoleId = res.userRoleIds[0];
            }
            if (res.userPermissions.length > 0) {
                this.userPermissions = res.userPermissions;
            }
            this.profileModel.attachment = new AttachmentModel();
        });
    }

    onFileSelect(files) {
        /* FormData is initiate to file upload where we append file detail */
        this.formData = new FormData();
        for (let file of files) {
            this.formData.append(file.name, file);
        }
        const access_token = this.localStorageService.getAccessToken();
        this.loaderService.show();
        this.http.post(ApiUrl.baseUrl + `Attachment/addProfilePicture/` + this.profileModel.attachmentId, this.formData, {
            headers: new HttpHeaders({
                'Authorization': `${access_token}`
            })
        }).subscribe((res: any) => {
            this.profileModel.attachmentId = res.id;
            this.profileModel.attachmentUrl = res.attachmentUrl;
            this.loaderService.hide();
        });


    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onSave() {

        if (this.profileModel.firstName === '' || this.profileModel.firstName.trim() == '') {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: 'First Name Required' });
            return;
        }
        if (this.profileModel.lastName === '' || this.profileModel.lastName.trim() == '') {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: 'Last Name Required' });
            return;
        }
        if (this.profileModel.email === '' || this.profileModel.email.trim() == '') {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: 'Email Required' });
            return;
        }
        if (!this.validateEmail(this.profileModel.email)) {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: 'Email Id Format Should Be xxx@example.com' });
            return;
        }
        if (this.profileModel.gender === -1) {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: 'Gender Required' });
            return;
        }
        //as per api requirement if file is not attached then attachment would be null
        if (this.profileModel.attachment !== null) {
            if (this.profileModel.attachment.attachmentName === '') {
                this.profileModel.attachment = null;
            }
        }

        if (this.userPermissions.length > 0) {
            this.profileModel.userPermissions = this.userPermissions;
        }
        if (this.selectedRoleId !== 0) {
            this.profileModel.userRoleIds.push(this.selectedRoleId);
        }
        if (this.selectedRoleId === 0 && this.profileModel.id == 0) {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: 'Please Select Role' });
            return;
        }
        this.profileService.saveUserDetail(this.profileModel, this.isSelfProfileEdit).subscribe(response => {
            this.messageService.showMessage({ type: 'success', title: 'Success', body: 'Record Save SucessFully' });
            if (this.path == 'edit-profile') {
                this.commonService.notifyOther({ option: 'setDisplayImage', value: this.profileModel.attachmentUrl });
            }
            if (this.currentLoggedUser.userRoleIds[0] === RoleEnum.Admin && this.path !== 'edit-profile') {
                this.router.navigate(['admin/users']);
            }
        });
    }

    getPermission(): void {
        this.leftMenuService.getLeftMenu().subscribe(leftMenu => {
            this.leftMenues = leftMenu;
            if (this.leftMenues.length > 0) {
                this.leftMenues.map(menu => {
                    if (menu.id === SubAdminPermission.User &&
                        menu.roleId === RoleEnum.SubAdmin || menu.roleId === RoleEnum.Admin) {
                        this.rolePermission = menu;
                    }
                });
            }
        });
        // this.leftMenues = JSON.parse(localStorage.getItem('leftMenuPermission'));

    }

    onCancel() {
        this.router.navigate(['admin/users']);
    }

    onRoleChange(event, role) {
        if (!event.isVisible && role == 'isVisible') {
            event.canEdit = false;
            event.canView = false;
            event.canAdd = false;
            event.canApprove = false;
        }
        if (!event.canView && role == 'canView') {
            event.canEdit = false;
            event.canAdd = false;
            event.canApprove = false;
        }
        if (event.canView && role == 'canView') {
            event.isVisible = true;
        }
        if (event.canEdit || event.canAdd || event.canApprove) {
            event.isVisible = true;
            event.canView = true;
        }

    }
}
