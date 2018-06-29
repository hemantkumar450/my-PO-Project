import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from '../../../../shared/loader/loader.service';
import { MessageService } from '../../../../shared/message/messageService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassModel, CommodityModel, ProsuctsModel } from './feature-type.model'
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-featuretype',
  templateUrl: './feature-type.component.html',
  styleUrls: ['./feature-type.component.css']
})

export class ProductFeatureTypeComponent implements OnInit {
  cities: Array<any> = [];
  getVendorListArgs = {}
  selectedCategories: number[] = [];
  class: Array<ClassModel> = [];
  commodity: Array<CommodityModel> = [];
  selectedClass: Array<any> = [];
  categories: Array<ProsuctsModel> = [];
  Keyword: any;
  name: any;
  classIds: Array<number> = [];
  commodityIds: Array<number> = [];
  cityIds: Array<string> = [];
  isCommodityCheckBoxDisabled: boolean = false;
  path: string = '';

  constructor(public productDataService: ProductService,
    private loaderService: LoaderService,
    protected route: ActivatedRoute,
    private messageService: MessageService) {
    this.getVendorListArgs = {
      'CommodityId': '',
      'ClassId': '',
      'FamilyId': ''

    };
  }
  ngOnInit() {

    this.path = this.route.snapshot.routeConfig.path;
    this.path = this.path.substr(0, this.path.indexOf('/'));

    this.route.params.subscribe(params => {
      this.Keyword = params['id'];
      this.Keyword = decodeURIComponent(this.Keyword)

      this.name = params['name'];
      if (this.Keyword !== '') {
        this.getVendorListArgs = {
          'Keywords': this.name ? null : this.Keyword,
          'CommodityId': this.name == 'commodity' ? this.Keyword : '',
          'ClassId': this.name == 'class' ? this.Keyword : '',
          'FamilyId': this.name == 'family' ? this.Keyword : ''

        };
        if (this.name == 'commodity') {
          this.isCommodityCheckBoxDisabled = true;
        } else {
          this.getVendorListArgs['KeywordType'] = this.path == 'vendor' ? 'Supplier' : 'Products';
        }
        this.getAllgetAllFiltrationData();
      }
    });

  }

  getAllgetAllFiltrationData() {
    this.productDataService.getAllFiltration(this.getVendorListArgs).subscribe(data => {
      this.class = data.class;
      if (this.class.length > 0) {
        this.class.map((item) => {
          item.isSelected = false;

        })
      }
      this.commodity = data.commodity;
      if (this.commodity.length > 0) {
        this.commodity.map((item) => {
          item.isSelected = false;
          if (this.name == 'commodity' && item.id == Number(this.Keyword)) {
            item.isSelected = true;
          }
        })
      }
      this.cities = data.cityNames;
      if (this.cities.length > 0) {
        this.cities.map((item) => {
          item.isSelected = false;
        })
      }

    });
  }



  onCategoryFilter(event) {
    let object = {
      keyword: this.name == undefined ? this.Keyword : null,
      filterBy: '',
      classIds: '',
      commodityIds: '',
      cityIds: ''
    }
    if (event == 'class') {
      this.classIds = []
      let selectedClass = this.class.filter((item) => {
        if (item.isSelected) {
          this.classIds.push(item.id)
        }
      })
    }
    if (event == 'commodity') {
      this.commodityIds = []
      let selectedCommodity = this.commodity.filter((item) => {
        if (item.isSelected) {
          this.commodityIds.push(item.id)
        }
      })
    }
    if (event == 'city') {
      this.cityIds = [];
      let selectedCity = this.cities.filter((item) => {
        if (item.isSelected) {
          this.cityIds.push(item.cityName)
        }
      })
    }
    object.filterBy = event;
    object.classIds = this.classIds.join();
    object.commodityIds = this.commodityIds.join();
    object.cityIds = this.cityIds.join();
    this.productDataService.categoryFilter.next(object)
  }



}
