import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../../../shared/message/messageService.service';
import { CategoryService } from '../shared/categories.service';
import { SegementModel } from '../shared/categories.model';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { DataTable, Message } from 'primeng/primeng';
import { PaginationService } from '../../../shared/service/pagination.service';
import { Paginator } from '../../../core/paginator/paginator';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {
  segments: Array<SegementModel> = [];
  gb: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  totalRecords: number = 0;
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

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public messageService: MessageService,
    private categoryService: CategoryService,
    private paginationService: PaginationService,

  ) {
  }

  ngOnInit() {
    this.paginationService.setFilterValues({});
    // this.gb = this.searchInput._gb.nativeElement;
    this.getSegment();
  }

  getSegment(): void {
    /* get segement data  */
    this.categoryService.getSegments(this.paginationService.getParams()).subscribe(res => {
      this.segments = res.data;
      this.totalRecords = res.data.length;
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
    this.getSegment();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getSegment();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginationService.setPageChange(this.pageEvent);
    this.paginationService.setFilterValues(event.filters);
    this.getSegment();
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

}
