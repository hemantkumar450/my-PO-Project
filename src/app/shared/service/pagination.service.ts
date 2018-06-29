// Import Injectable Decorator
import { Injectable, OnInit } from '@angular/core';
import { PaginationEnum } from '../enums/base.enum';


// Use @Injectable() to declare the RouteService class as an Injectable
@Injectable()
export class PaginationService implements OnInit {

  sortExpression = '';
  filterValues = [];
  startPage = 1;
  pageSize = PaginationEnum.PageSize;

  constructor() {
  }

  ngOnInit() {
  }

  setDefaultPage() {
    this.startPage = 1;
    this.pageSize = PaginationEnum.PageSize;
    this.sortExpression = '';
    this.filterValues = [];
  }

  resetPagination() {
    this.startPage = 1;
    this.pageSize = PaginationEnum.PageSize;
    this.sortExpression = '';
  }

  setPageChange(event) {
    this.startPage = 1 + event.page;
    this.pageSize = event.rows;
  }

  getParams() {
    let pagination = {
      PageSize: this.pageSize,
      RunCount: true,
      StartPageNo: this.startPage,
      SortExpression: this.sortExpression,
      Filter: {}
    };
    for (let prop in this.filterValues) {
      pagination.Filter[prop] = this.filterValues[prop].value;
    }

    return Object.assign(pagination, this.filterValues);
  }

  getTestParams(filterValues) {
    let pagination = {
      PageSize: this.pageSize,
      RunCount: true,
      StartPageNo: this.startPage,
      SortExpression: this.sortExpression,
      Filter: {}
    };
    for (let prop in filterValues) {
      pagination.Filter[prop] = filterValues[prop];
    }

    return Object.assign(pagination, filterValues);
  }

  setSortExpression(event) {
    this.sortExpression = '';
    if (event) {
      let orderBy = '';
      if (event.order === -1) {
        orderBy = 'desc';
      }
      this.sortExpression = event.field + ' ' + orderBy;
    }
  }

  setFilterValues(filtersObj) {
    // if (filtersObj.length === 0) {
    this.filterValues = [];
    //   return;
    // }
    this.resetPagination();
    // let filterValues = Object.assign({}, this.filterValues);
    let copy = Object.assign({}, filtersObj);
    let copy2 = Object.assign({}, filtersObj);
    // this._deleteAllProp(filtersObj);
    this._deleteEmptyProp(copy);
    // let newFilterValue = this._addPrefixToProp(copy);
    this._matchFilterProps(copy2);
    Object.assign(this.filterValues, copy);
  }

  _matchFilterProps(obj) {
    for (const prop in obj) {
      if (this.filterValues[prop]) {
        this.filterValues[prop] = obj[prop].value;
      }
    }
  }

  _deleteAllProp(obj) {
    for (let prop in obj) {
      delete obj[prop];
    }
    return obj;
  }

  _deleteEmptyProp(obj) {
    for (let prop in obj) {
      let val = obj[prop].value;
      if (val === undefined || val === null || val.length === 0) {
        delete obj[prop];
      }
    }
    return obj;
  }

  _addPrefixToProp(obj) {
    for (let prop in obj) {
      obj[prop] = obj[prop].value;
      delete obj[prop];
    }
    return obj;
  }

  getParamsForAutoScroll() {
    const pagination = {
      PageSize: this.pageSize,
      RunCount: true,
      StartPageNo: this.startPage,
      SortExpression: this.sortExpression,
      'SegmentCode': '',
      'SegmentName': '',
      'ProductCode': '',
      'ProudctName': '',
      'VendorName': '',
      'VendorCode': ''
    };
    return Object.assign(pagination, this.filterValues);
  }
}
