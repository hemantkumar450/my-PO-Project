import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MessageService } from '../../../shared/message/messageService.service';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleEnum, StatusTypeEnum } from '../../../shared/enums';
import { UserRFQModel } from '../../user/user.model';
import { SharedService } from '../../../core/shared/service/shared.service';
import { Paginator } from '../../../core/paginator/paginator';
import { PaginationService } from '../../../shared/service/pagination.service';
import { DataTable } from 'primeng/primeng';
import { UserService } from '../../user/services/user.service';

@Component({
    selector: 'app-rfq',
    templateUrl: './rfq.component.html',
    styleUrls: ['./rfq.component.css']
})

export class RFQComponent implements OnInit {

    @Input() vendorRfq: boolean;
    @Input() userRfq: boolean;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    @ViewChild(Paginator) paginatorComponent: Paginator;
    rfqList: Array<UserRFQModel> = [];
    totalRecords: number = 0;
    statusRfq: any;
    pageSize: number = PaginationEnum.PageSize;
    page: number = 0;
    pageEvent = {
        first: 0,
        page: 0,
        pageCount: 0,
        rows: 0
    }
    pageNo: number = 0;
    isPageJumpCall: boolean = false;
    totalPages: number = 0;
    status = [
        { label: 'All Status', value: null },
    ];

    constructor(
        private router: Router,
        public route: ActivatedRoute,
        private paginationService: PaginationService,
        public messageService: MessageService,
        public sharedService: SharedService,
        public userService: UserService
    ) {
        this.getStatusList();
    }

    ngOnInit() {
        this.route.queryParams.subscribe((param) => {
            const obj = {
                statusId: {
                matchMode: undefined,
                value: param.value
              }
            };
            this.paginationService.setFilterValues(obj);
          });
        this.getRFQList();
    }

    getStatusList() {
        this.sharedService.statusList(StatusTypeEnum.RFQStatus).subscribe(list => {
            list.map(st => {
                this.status.push({ label: st.statusName, value: st.id });
            });
        });
    }

    getRFQList() {
        this.userService.getUserRFQList(this.paginationService.getParams()).subscribe((response) => {
            this.rfqList = response.data;
            this.totalRecords = response.totalRecords;
        });
    }

    vendorChat(data) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.UserRoleIds[0] === RoleEnum.Vendor) {
            this.router.navigate(['/vendor/chat/' + data.id + '/' + data.rfqNo]);
        } else if (user.UserRoleIds[0] === RoleEnum.PDU) {
            this.router.navigate(['/user/chat/' + data.rfqId + '/' + data.vendorId + '/' + data.rfqNo]);
        }
    }

    addRequest(value) {
        this.router.navigate(['/user/requestQuote/' + value]);
    }

    onClickRfq(detail) {
        this.sharedService.getUserDetail().subscribe(res => {
            const user = res;
            if (user.userRoleIds[0] === RoleEnum.Vendor) {
                this.router.navigate(['/vendor/rfq/edit/' + detail.id]);
            } else if (user.userRoleIds[0] === RoleEnum.PDU) {
                this.router.navigate(['/user/rfq/edit/' + detail.id]);
            }
        });
    }

    /* call to page change of the grid */
    pageChanged(event) {
        this.pageNo = event.page + 1;
        this.pageSize = this.paginatorComponent._rows;
        this.paginationService.setPageChange(event);
        this.getRFQList();
    }

    /* call to sorting the grid data */
    onSorting(event) {
        this.paginationService.setSortExpression(event);
        this.getRFQList();
    }

    /* call to filter the grid data */
    onFiltering(event) {
        this.dataTableComponent.reset();
        this.paginationService.setPageChange(this.pageEvent);
        this.paginationService.setFilterValues(event.filters);
        this.getRFQList();
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
            return
        }
        this.isPageJumpCall = true;
        this.pageChanged(this.pageEvent);
    }

    getRfqStatusFilter(value) {
        const obj = {
            filters: {
                statusId: {
                    matchMode: undefined,
                    value: value
                }
            }
        };
        this.onFiltering(obj);
    }
}
