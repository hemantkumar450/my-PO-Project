import { Component, OnInit } from '@angular/core';
import { CompareModel, ProductService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { AnimationQueryMetadata } from '@angular/animations';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MessageService } from '../../../shared/message/messageService.service';
import { LocalStorageService } from '../../../shared/service';
import { Location } from '@angular/common';
import { CommonService } from '../../../shared/service/common.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})

export class ProductCompareComponent implements OnInit {
  compareList: Array<CompareModel> = [];
  productIds: Array<number> = [];/* temperary ,will delete it later */


  constructor(private productService: ProductService, /* inject service to call methods */
    public route: ActivatedRoute,/* inject tpo get params from url */
    private messageService: MessageService,
    private location: Location,
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService /* inject this service to show/hide loader */) {
  }

  ngOnInit() {
    /* use route to get the params from yhe urls */
    let productCompare = JSON.parse(localStorage.getItem('productCompare'));
    productCompare.forEach(element => {
      this.productIds.splice(this.productIds.length, 0, element.productId);
    });
    this.getCompareList();
  }

  getCompareList() {
    /* its help to  enable loader before goes to api  */
    this.loaderService.show();
    /* call get compare function of product service */
    this.productService.getCompareList(this.productIds).subscribe((response) => {
      /* get complete compare list array in response  */
      this.compareList = response;
      this.compareList.forEach((list) => {
        this.compareList.forEach((item) => {
          if (list.commodityId !== item.commodityId) {
            this.messageService.showMessage({ type: 'info', title: 'warning', body: 'commodity are not same for all products' });
            return;
          }
        });
      });
      /* its help to disable loader before goes to api  */
      this.loaderService.hide();
    });
  }

  removeCompare(id, productIndex) {
    let compareList: any = this.localStorageService.getProductCompare();
    compareList = compareList === null ? [] : JSON.parse(compareList);
    let index = compareList.findIndex(item => item.productId === id);
    compareList.splice(index, 1);
    this.compareList.splice(productIndex, 1);
    this.localStorageService.setProductCompare(compareList);
    var xIndex = this.productIds.indexOf(id);
    if (xIndex > -1) {
      this.productIds.splice(index, 1);
    }
    this.location.go('product/compare?ids=' + this.productIds);
    this.commonService.notifyOther({ option: 'setNavBarCountEvent', value: this.compareList.length });
  }
}
