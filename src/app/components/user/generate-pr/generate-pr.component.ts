import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneratePR, GeneratePRService } from './shared';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { PaginationService } from '../../../shared/service/pagination.service';
import { DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Paginator } from '../../../core/paginator/paginator';
import { MessageService } from '../../../shared/message/messageService.service';

@Component({
    selector: 'app-generate-pr',
    templateUrl: './generate-pr.component.html',
    styleUrls: ['./generate-pr.component.css']
})

export class GeneratePrComponent implements OnInit {
    generatePrDetail: Array<GeneratePR> = [];
    totalRecords: number = 0;
    gb: any;
    pageSize: number = PaginationEnum.PageSize;
    @ViewChild(Paginator) paginatorComponent: Paginator;
    @ViewChild(DataTable) dataTableComponent: DataTable;
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
    type = [
        { label: 'All', value: null },
        { label: 'Purchases Order', value: '0' },
        { label: 'Purchases Request', value: '1' }
    ];
    status: any;

    constructor(private generatePRService: GeneratePRService,
        protected router: Router,
        public messageService: MessageService,
        private paginationService: PaginationService) {
    }

    ngOnInit() {
        this.paginationService.setFilterValues({});
        this.getGeneratePR();
    }

    getGeneratePR() {
        this.generatePRService.getGeneratePR(this.paginationService.getParams()).subscribe(response => {
            this.generatePrDetail = response.data;
            this.totalRecords = response.totalRecords;
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

    onPREdit(item: any) {
        if (item.isPurchaseRequest) {
            this.router.navigate(['cart/pr/requisition-info/edit/' + item.vendorId + '/' + item.id]);
        } else {
            this.router.navigate(['cart/pr/purchase-order/edit/' + item.vendorId + '/' + item.id]);
        }

    }

    /* call to page change of the grid */
    pageChanged(event) {
        this.pageNo = event.page + 1;
        this.pageSize = this.paginatorComponent._rows;
        this.paginationService.setPageChange(event);
        this.getGeneratePR();
    }

    /* call to sorting the grid data */
    onSorting(event) {
        this.paginationService.setSortExpression(event);
        this.getGeneratePR();
    }

    /* call to filter the grid data */
    onFiltering(event) {
        this.dataTableComponent.reset();
        this.paginationService.setPageChange(this.pageEvent);
        this.paginationService.setFilterValues(event.filters);
        this.getGeneratePR();
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

    getStatus(value) {
        const obj = {
            filters: {
                isPurchaseRequest: {
                    matchMode: undefined,
                    value: value
                }
            }
        };
        this.onFiltering(obj);
    }

}
