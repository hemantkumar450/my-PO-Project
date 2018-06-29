import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../../../shared/message/messageService.service';
import { DataTable, Message } from 'primeng/primeng';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { PaginationService } from '../../../shared/service/pagination.service';
import { VendorService } from '..';
import { StatusTypeEnum, SubAdminPermission, RoleEnum, BulkUploadEnum } from '../../../shared/enums';
import { ConfirmationService } from 'primeng/api';
import { VendorRegisterModel } from '../../../auth/vendor-registration/shared/vendor-register.model';
import { StatusModel, RolePermission } from '../shared';
import { VendorRegistrationService } from '../../../auth/vendor-registration';
import { Paginator } from '../../../core/paginator/paginator';
import { LeftMenuService } from '../../../core/shared/left-menu/left-menu.service';
import { SharedService } from '../../../core/shared/service/shared.service';


@Component({
  selector: 'app-vendor-permission',
  templateUrl: './vendor-permission.component.html',
  styleUrls: ['./vendor-permission.component.css'],
  providers: [ConfirmationService]
})

export class VendorPermissionComponent implements OnInit {
  type = BulkUploadEnum.Vendors;
  vendorsList: Array<VendorRegisterModel> = [];
  statusList: Array<StatusModel> = [];
  totalRecords: number = 0;
  pageSize: number = PaginationEnum.PageSize;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  gb: any;
  page: number = 0;
  leftMenues = [];
  rolePermission: RolePermission = new RolePermission();
  @ViewChild(Paginator) paginatorComponent: Paginator;
  showContent = false;
  pageEvent = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0
  };
  statusVendorPermission: any;
  pageNo: number = 0;
  isPageJumpCall: boolean = false;
  totalPages: number = 0;
  status = [
    { label: 'All', value: null },
  ];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService,
    private paginationService: PaginationService,
    private vendorService: VendorService,
    public leftMenuService: LeftMenuService,
    private confirmationService: ConfirmationService,
    public vendorRegistrationService: VendorRegistrationService,
    public sharedService: SharedService
  ) {
    this.sharedService.statusList(StatusTypeEnum.Vendor).subscribe(list => {
      list.map(st => {
        this.status.push({ label: st.statusName, value: st.id });
      });
    });

  }

  ngOnInit() {
    this.paginationService.setFilterValues({});
    this.getStatus();
    this.route.queryParams.subscribe((param) => {
      const obj = {
        vendorStatusId: {
          matchMode: undefined,
          value: param.value
        }
      };
      this.paginationService.setFilterValues(obj);
    });
    this.getVendorList();
    this.getPermission();

  }

  openDialog() {
    this.showContent = true;
  }

  showContentFalse(event) {
    this.showContent = false;
  }

  onStatusChange(statusDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed ?',
      header: 'Status Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.vendorService.upDateSatus(statusDetail).subscribe(updateResult => {
          if (updateResult) {
            this.messageService.showMessage({ type: 'success', title: 'Vendor', body: 'Update Successfully' });
          }
        });
      },
      reject: () => {
        // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  getStatus() {
    /* get status list */
    this.vendorService.getStatus(StatusTypeEnum.Vendor).subscribe(vendorStatusResult => {
      this.statusList = vendorStatusResult;
    });
  }

  getVendorList() {
    /* get vendor list   */
    this.vendorService.getVendorList(this.paginationService.getParams()).subscribe(res => {
      this.vendorsList = res.data;
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


  upDateStatus(id) {
    /* route to vendor registartion page  */
    this.router.navigate(['auth/vendor-edit/' + id]);
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.pageNo = event.page + 1;
    this.pageSize = this.paginatorComponent._rows;
    this.paginationService.setPageChange(event);
    this.getVendorList();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getVendorList();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginationService.setPageChange(this.pageEvent);
    this.paginationService.setFilterValues(event.filters);
    this.getVendorList();
  }

  getPermission(): void {
    this.leftMenuService.getLeftMenu().subscribe(leftMenu => {
      this.leftMenues = leftMenu;
      if (this.leftMenues.length > 0) {
        this.leftMenues.map(menu => {
          if (menu.id === SubAdminPermission.Vendor &&
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
      this.pageNo = 0;
      this.messageService.showMessage({ type: 'info', title: 'Warning', body: 'Given No is bigger or lesser than total pages' });
      return;
    }
    this.isPageJumpCall = true;
    this.pageChanged(this.pageEvent);
  }

  getVenodrStatusFilter(value) {
    const obj = {
      filters: {
        vendorStatusId: {
          matchMode: undefined,
          value: value
        }
      }
    };
    this.onFiltering(obj);
  }
}
