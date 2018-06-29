import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from '../../../shared/service/pagination.service';
import { DataTable } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { UserService } from '../services/user.service';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { UserModel } from '../models/user.model';
import { RolePermission } from '../../vendor/shared';
import { SubAdminPermission, RoleEnum, BulkUploadEnum } from '../../../shared/enums';
import { LeftMenuService } from '../../../core/shared/left-menu/left-menu.service';
import { MessageService } from '../../../shared/message/messageService.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    type = BulkUploadEnum.Users;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    @ViewChild(Paginator) paginatorComponent: Paginator;
    totalRecords: number = 0;

    pageSize: number = PaginationEnum.PageSize;
    pageNo: number = 0;
    users: Array<UserModel> = [];
    gb: any;
    page: number = 0;
    leftMenues = [];
    rolePermission: RolePermission = new RolePermission();
    showContent = false;
    first: number = 4;
    pageEvent = {
        first: 0,
        page: 0,
        pageCount: 0,
        rows: 0
    }
    isPageJumpCall: boolean = false;
    totalPages: number = 0;

    constructor(protected router: Router,
        private paginationService: PaginationService,
        private userService: UserService,
        private messageService: MessageService,
        public leftMenuService: LeftMenuService) {
    }

    ngOnInit() {
        this.paginationService.setFilterValues({});
        this.getUserList();
        this.getPermission();
    }

    bulkUpload() {
        this.showContent = true;
    }

    showContentFalse(event) {
        this.showContent = false;
    }

    getUserList() {
        this.userService.getUserList(this.paginationService.getParams()).subscribe(res => {
            this.users = res.data;
            this.totalRecords = res.totalRecords;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            if (this.isPageJumpCall) {
                this.paginatorComponent._first = this.pageNo - 1;
                this.paginatorComponent.getPage();
                this.paginatorComponent.changePage(this.paginatorComponent._first, null)
                this.isPageJumpCall = false;
            } else {
                this.pageNo = this.paginatorComponent === undefined ? 1 : this.paginatorComponent.getPage() + 1;
            }
        });
    }

    /* call to page change of the grid */
    pageChanged(event) {
        this.pageNo = event.page + 1;
        this.pageSize = this.paginatorComponent._rows;
        this.paginationService.setPageChange(event);
        this.getUserList();
    }

    /* call to sorting the grid data */
    onSorting(event) {
        this.paginationService.setSortExpression(event);
        this.getUserList();
    }

    /* call to filter the grid data */
    onFiltering(event) {
        this.dataTableComponent.reset();
        this.paginationService.setPageChange(this.pageEvent);
        this.paginationService.setFilterValues(event.filters);
        this.getUserList();
    }

    onUserAdd() {
        this.router.navigate(['admin/user/add']);
    }

    onUserEdit(id) {
        this.router.navigate(['admin/user/edit/' + id]);
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
    }

    onPageEvent() {
        this.pageEvent = {
            first: Number((this.pageNo - 1) * this.pageSize),
            page: this.pageNo - 1,
            pageCount: Math.ceil(Number(this.totalRecords / this.paginatorComponent._rows)),
            rows: this.pageSize
        }
        if (+this.pageNo < 0 || this.pageEvent.pageCount < +this.pageNo || +this.pageNo === 0) {
            this.pageNo = this.paginatorComponent.getPage() + 1;
            this.messageService.showMessage({ type: 'info', title: 'Warning', body: 'Given No is bigger or lesser than total pages' });
            return
        }
        this.isPageJumpCall = true;
        this.pageChanged(this.pageEvent);
    }
}
