import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTable } from 'primeng/primeng';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { PaginationService } from '../../../shared/service/pagination.service';
import { RoleEnum, SubAdminPermission, BulkUploadEnum, StatusTypeEnum } from '../../../shared/enums';
import { Paginator } from '../../../core/paginator/paginator';
import { RolePermission, VendorService } from '../../vendor/shared';
import { ProductService } from '../shared';
import { SharedService } from '../../../core/shared/service/shared.service';
import { LeftMenuService } from '../../../core/shared/left-menu/left-menu.service';
import { MessageService } from '../../../shared/message/messageService.service';

@Component({
  selector: 'app-product-master-grid',
  templateUrl: './master-grid.component.html'
})

export class ProductMasterGridComponent implements OnInit {
  type = 'Products';
  @ViewChild(DataTable) dataTableComponent: DataTable;
  totalRecords: number = 0;
  pageSize: number = PaginationEnum.PageSize;
  page: number = 0;
  products: Array<any> = [];
  roleId: number = 0;
  rolePermission: RolePermission = new RolePermission();
  @ViewChild(Paginator) paginatorComponent: Paginator;
  isProductModeOn: boolean = false;
  leftMenues = [];
  pageNo: number = 0;
  showContent = false;
  pageEvent = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0
  }
  isPageJumpCall: boolean = false;
  totalPages: number = 0;
  status: any;
  statusList = [
    { label: 'All', value: null },
  ];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private vendorService: VendorService,
    private messageService: MessageService,
    private paginationService: PaginationService,
    private productService: ProductService,
    private sharedService: SharedService,
    private leftMenuService: LeftMenuService
  ) {
    let url = this.router.url.split('/');
    let pageRequest = url[url.length - 1];
    if (pageRequest === 'products') {
      this.isProductModeOn = true;
    }
    this.sharedService.getUserDetail().subscribe(res => {
      const currentUser = res;
      this.roleId = currentUser.userRoleIds[0];
      this.sharedService.statusList(StatusTypeEnum.VendorProduct).subscribe(list => {
        list.map(st => {
          this.statusList.push({ label: st.statusName, value: st.id });
        });
      });
    });
  }

  ngOnInit() {

    this.paginationService.setFilterValues({});
    this.route.queryParams.subscribe((param) => {
      const obj = {
        vendorProductStatusId: {
          matchMode: undefined,
          value: param.value
        }
      };
      this.paginationService.setFilterValues(obj);
    });
    this.checkModeEvent();
    this.getPermission();
  }

  bulkProductLinking() {
    this.type = BulkUploadEnum.VendorProductLinking;
    this.showContent = true;
  }

  bulkProductUpload() {
    this.type = BulkUploadEnum.Products;
    this.showContent = true;
  }

  showContentFalse(event) {
    this.showContent = false;
  }

  checkModeEvent() {
    if (this.isProductModeOn) {
      this.getProducts();
    } else {
      this.getVendorProducts();
    }
  }

  getProducts() {
    this.productService.getMasterProducts(this.paginationService.getParams()).subscribe((res: any) => {
      this.products = res.data;
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

  getVendorProducts() {
    this.vendorService.getAllVendorProducts(this.paginationService.getParams()).subscribe((res: any) => {
      this.products = res.data;
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

  onProductView(id) {
    if (this.roleId === RoleEnum.Admin || this.roleId === RoleEnum.SubAdmin || this.roleId === RoleEnum.Vendor) {
      if (this.isProductModeOn) {
        this.router.navigate(['admin/product/edit/' + id]);
      } else {
        this.router.navigate(['vendor/product/edit/' + id]);
      }
    }
  }

  openAddProduct() {
    if (this.isProductModeOn) {
      this.router.navigate(['/admin/product/add']);
    } else {
      this.router.navigate(['/vendor/product/add']);
    }
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.pageNo = event.page + 1;
    this.pageSize = this.paginatorComponent._rows;
    this.paginationService.setPageChange(event);
    this.checkModeEvent();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.checkModeEvent();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginationService.setPageChange(this.pageEvent);
    this.paginationService.setFilterValues(event.filters);
    this.checkModeEvent();
  }
  getPermission(): void {
    this.leftMenuService.getLeftMenu().subscribe(leftMenu => {
      this.leftMenues = leftMenu;
      if (this.leftMenues.length > 0) {
        this.leftMenues.map(menu => {
          if (menu.id === SubAdminPermission.VendorProducts &&
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

  getStatus(value) {
    const obj = {
      filters: {
        vendorProductStatusId: {
          matchMode: undefined,
          value: value
        }
      }
    };
    this.onFiltering(obj);
  }
}
