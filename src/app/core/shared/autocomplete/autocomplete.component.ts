import { Component, OnInit, Input } from '@angular/core';
import { RoleEnum } from '../../../shared/enums';
import { ApiUrl } from '../../../shared/api.service';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../service/core.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  currentLoggedUser: boolean = false;
  isPDU: boolean = false;
  filteredProducts: any[];
  brands: string[] = [];
  user: any;
  @Input() product: string;
  selectedSearchOption: string = '';
  searchBy: Array<any> = [];
  path:string='';
  constructor(
    private http: Http,
    protected router: Router,
    public coreService: CoreService,
    public sharedService: SharedService,
    protected route: ActivatedRoute,

  ) {
    this.sharedService.getUserDetail().subscribe(res => {
      this.user = res;
      if (this.user.userRoleIds[0] === RoleEnum.PDU) {
        this.isPDU = true;
      }
      if (this.user.userRoleIds[0] === RoleEnum.PDU) {
        this.currentLoggedUser = true;
      }
    });

    this.searchBy = [{
      label: 'Product',
      value: 'Product'
    }, {
      label: 'Supplier',
      value: 'Supplier'
    }]
  }

  filterProducts(event) {
    this.brands = [];
    // POST /api/Vendor/GetBySupplierName/{supplierName}
    let url = (ApiUrl.baseUrl + 'Product/GetByProductName/' + event.query);
    if (this.selectedSearchOption == 'Supplier') {
      url = (ApiUrl.baseUrl + 'Vendor/GetBySupplierName/' + event.query);
    }
    this.http.post(url, null).subscribe(
      (data: any) => {
        this.brands = [...JSON.parse(data._body)];
      },
      error => {
        // this is not called. Ok!
      },
      () => { // when complete
        this.filteredProducts = this.brands;
      }
    );

  }
  
  ngOnInit() {
    this.selectedSearchOption = 'Product'
    this.path = this.router.url;
    if (this.path.indexOf('vendor') !== -1) {
      this.selectedSearchOption = 'Supplier';
      let product =this.router.url.split("vendor/").pop();
      product= decodeURIComponent( decodeURIComponent(product));
      this.product = product;
    } else if (this.path.indexOf('product-list') !== -1) {
     let product = this.router.url.split("product-list/").pop();
     product= decodeURIComponent( decodeURIComponent(product));
     this.product = product;
    }
    


    this.route.params.subscribe(params => {
      this.path = params['user'];


    });

    this.coreService.searchKey.subscribe((data) => {
      this.product = data;
    });

  }

  onProductSearch() {
    // let selectedItem = this.product.replace(/\//g , " ");
    if (this.product) {
      let selectedItem = encodeURIComponent(this.product);
      this.selectedSearchOption == 'Product' ? this.router.navigate(['product/product-list/' + selectedItem]) : this.router.navigate(['product/vendor/' + selectedItem]);
    }

  }

  onSearchBySelect() {
    this.product = '';
  }



}
