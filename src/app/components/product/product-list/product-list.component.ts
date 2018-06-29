import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MessageService } from '../../../shared/message/messageService.service';
import { SelectItem, VendorProductList, ProductService } from '../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs/Observable"
import { Subscriber } from 'rxjs';
import { CommonService } from '../../../shared/service/common.service';
import { LocalStorageService } from '../../../shared/service';
import { PaginationService } from '../../../shared/service/pagination.service';
import { DataTable } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { PaginationEnum, ProductPaginationEnum } from '../../../shared/enums/base.enum';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  productLists: Array<VendorProductList> = [];
  sortOptions: SelectItem[];
  dataCount: number = 0;
  @ViewChild('dv') private dataView: ElementRef;
  totalRecords: number = 0;
  keyword: any;
  isResultNotFound: boolean = false;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  pageNo: number = 0;
  pageSize: number = ProductPaginationEnum.PageSize;
  gb: any;
  page: number = 1;
  subCategoryName: any
  getVendorListArgs: any;
  subscription: Subscription;
  pageEvent = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0
  }
  isPageJumpCall: boolean = false;
  totalPages: number = 0;
  path: string = '';
  constructor(private productService: ProductService,
    private loaderService: LoaderService,
    protected route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    private paginationService: PaginationService,
    private ElementRef: ElementRef) {
    this.getVendorListArgs = {};
    this.sortOptions = [
      { label: 'Best Match', value: 'productName' },
      { label: 'Price (Lowest - Highest)', value: ' productPrice' },
      { label: 'Price (Highest - Lowest)', value: ' productPrice Desc' },
    ];
  }

  ngOnInit() {
    if (this.paginatorComponent) {
      this.paginatorComponent._first = 0;
      this.paginatorComponent.getPage();
    }

    this.path = this.route.snapshot.routeConfig.path;
    this.path = this.path.substr(0, this.path.indexOf('/'));

    this.route.params.subscribe(params => {
      this.keyword = params['id'];
      this.keyword = decodeURIComponent(this.keyword)
      this.subCategoryName = params['name'];
      if (this.keyword !== '') {
        this.getVendorListArgs = {
          'Keywords': this.subCategoryName === undefined ? this.keyword : null,
          'FamilyIds': this.subCategoryName === 'family' ? this.keyword : null,
          'ClassIds': this.subCategoryName === 'class' ? this.keyword : null,
          'CommodityIds': this.subCategoryName === 'commodity' ? this.keyword : null,
          'KeywordType': this.path == 'vendor' ? 'Supplier' : 'Products',
          'PageSize': this.pageSize,
          'RunCount': true
        };
        this.VendorProductList();
      }
    });
    this.subscription = this.productService.categoryFilter.subscribe((data) => {
      if (this.paginatorComponent)
        this.paginatorComponent._first = 0;
      if (this.paginatorComponent)
        this.paginatorComponent.getPage();
      this.getVendorListArgs = {
        'Keywords': data.keyword,
        'FamilyIds': this.subCategoryName === 'family' ? this.keyword : null,
        'ClassIds': data.filterBy === 'class' ? data.classIds : data.classIds !== '' ? data.classIds : this.subCategoryName == 'class' ? this.keyword : null,
        'CommodityIds': data.filterBy === 'commodity' ? data.commodityIds : data.commodityIds !== '' ? data.commodityIds : this.subCategoryName == 'commodity' ? this.keyword : null,
        'CityNames': data.filterBy === 'city' ? data.cityIds : data.cityIds !== '' ? data.cityIds : null,
        'PageSize': this.pageSize,
        'RunCount': true,
        'KeywordType': this.path == 'vendor' ? 'Supplier' : 'Products'
      };
      this.VendorProductList();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  VendorProductList() {
    this.productService.getVendorProductList(this.paginationService.getTestParams(this.getVendorListArgs))
      .subscribe(data => {
        this.productLists = data.data;
        this.totalRecords = data.totalRecords;
        this.isResultNotFound = data.totalRecords > 0 ? false : true;
        const totalPages = Math.ceil(this.totalRecords / ProductPaginationEnum.PageSize);
        this.dataCount = this.pageNo * this.pageSize;
        if (this.dataCount > this.totalRecords) {
          this.dataCount = this.totalRecords;
        } else if (this.dataCount === 0) {
          if (this.totalRecords < this.pageSize)
            this.dataCount = this.totalRecords;
          else
            this.dataCount = this.pageSize;
        }
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        if (this.isPageJumpCall) {
          this.paginatorComponent._first = this.pageNo - 1;
          this.paginatorComponent.getPage();
          this.paginatorComponent.changePage(this.paginatorComponent._first, null)
          this.isPageJumpCall = false;
        } else {
          this.pageNo = this.paginatorComponent === undefined ? 1 : this.paginatorComponent.getPage() + 1;
        }
      })
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.pageNo = event.page + 1;
    this.dataCount = this.pageNo * this.pageSize;
    if (this.dataCount > this.totalRecords) {
      this.dataCount = this.totalRecords;
    }
    this.pageSize = this.paginatorComponent._rows;
    this.paginationService.setPageChange(event);
    this.VendorProductList();
  }


  onSortChange(event) {
    this.getVendorListArgs.SortExpression = event.value;
    this.VendorProductList();
  }

  openIndividual(id) {
    this.router.navigate(['/product/individual/' + id]);
  }

  addToCartEvent(item) {
    const obj = {
      vendorProductId: item.id,
      qty: 1,
      totalPrice: item.productPrice,
    };
    this.productService.addToCart(obj).subscribe(result => {
      const addCartObj = {
        itemCount: 1,
        totalPrice: item.productPrice,
      };
      this.commonService.notifyOther({ option: 'setAddCart', value: addCartObj });
      this.messageService.showMessage({ type: 'sucess', title: 'Cart', body: 'Item is added in Cart' });
    });
  }

  setProductCompare(item) {
    let obj = {
      productId: item.id,
      commodityId: item.commodityId
    }
    let compareList: any = this.localStorageService.getProductCompare();
    compareList = compareList === null ? [] : JSON.parse(compareList);
    let compare = compareList.find(i => i.productId === item.id);
    if (compare) {
      this.messageService.showMessage({ type: 'info', title: 'Warning', body: 'Already added' });
      return;
    }
    if (compareList.length < 3) {
      this.commonService.notifyOther({ option: 'setProductCompareObj', value: obj });
      this.messageService.showMessage({ type: 'success', title: 'Compare', body: 'Item added for compare' });
    } else {
      this.messageService.showMessage({ type: 'info', title: 'Warning', body: 'Already 3 items in the list' });
    }
  }

  redirectPage(value) {
    this.router.navigate(['/user/requestQuote/' + value]);
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

