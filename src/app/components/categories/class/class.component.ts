import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../../../shared/message/messageService.service';
import { CategoryService } from '../shared/categories.service';
import { ClassModel } from '../shared/categories.model';
import { DataTable } from 'primeng/primeng';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { PaginationService } from '../../../shared/service/pagination.service';
import { Paginator } from '../../../core/paginator/paginator';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  class: Array<ClassModel> = [];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  totalRecords: number = 0;
  pageSize: number = PaginationEnum.PageSize;
  gb: any;
  page: number = 0;
  pageEvent = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0
  }
  pageNo: number = 0;
  totalPages: number = 0;
  isPageJumpCall: boolean = false;


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
    this.getClass();
  }


  getClass(): void {
    /* get class data  */
    this.categoryService.getClass(this.paginationService.getParams()).subscribe(res => {
      this.class = res.data;
      this.totalRecords = this.class.length;
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
    this.getClass();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getClass();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getClass();
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
