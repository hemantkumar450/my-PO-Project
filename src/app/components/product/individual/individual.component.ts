import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel, ProductService } from '../shared';
import { CommonService } from '../../../shared/service/common.service';
import { LocalStorageService } from '../../../shared/service';
import { MessageService } from '../../../shared/message/messageService.service';

@Component({
  selector: 'app-product-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})

export class ProductIndividualComponent implements OnInit {
  /* by default show image */
  headImage = '../../../../assets/images/productDetail/no-product-found.png';
  /* initialize the product model*/
  vendorProduct: ProductModel = new ProductModel();
  /* initialize the images array */
  images: Array<any> = [];
  /* initialize the bottom related array */
  relatedList: Array<any> = [];

  constructor(public route: ActivatedRoute,
    private commonService: CommonService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private productService: ProductService) {
    /* get the vendor product id from the url param*/
    this.vendorProduct.id = Number(this.route.snapshot.params.vendorProductId);
    /*call to get vendor product by id */
    this.getProductDetail();
  }

  ngOnInit() { }

  /* function to call product detail*/
  getProductDetail() {
    /*calling service method to get data by  productId */
    this.productService.getProductDetail(this.vendorProduct.id).subscribe(result => {
      /*transfer result into vendorProduct model */
      this.vendorProduct = result;
      /* add images into images array from productAttachments*/
      this.vendorProduct.productAttachments.forEach(item => {
        this.images.splice(this.images.length, 0, item.attachmentUrl);
      });
      /* set first Image into head Image*/
      this.headImage = this.images[0];
      /* call related images get method*/
      this.getRelatedList();
    });
  }

  /* method to get related images*/
  getRelatedList() {
    /*get class id from vendor product model */
    this.vendorProduct.classId = this.vendorProduct.classId;
    /* call related product method from service */
    this.productService.getRelatedList(this.vendorProduct.classId).subscribe(result => {
      /* set data into relatedList*/
      this.relatedList = result;
    });
  }

  showProductImage(event) {
    /* set headImage with selected image from user */
    this.headImage = event.target.currentSrc;
  }

  addToCart() {
    let obj = {
      vendorProductId: this.vendorProduct.id,
      qty: 1,
      totalPrice: this.vendorProduct.productPrice,
    }
    this.productService.addToCart(obj).subscribe(result => {
      let addCartObj = {
        itemCount: 1,
        totalPrice: this.vendorProduct.productPrice,
      }
      this.commonService.notifyOther({ option: 'setAddCart', value: addCartObj });
      this.messageService.showMessage({ type: 'sucess', title: 'Cart', body: 'Item is added in Cart' });
    });
  }

  setProductCompare() {
    let obj = {
      productId: this.vendorProduct.id,
      commodityId: this.vendorProduct.commodityId
    }
    let compareList: any = this.localStorageService.getProductCompare();
    compareList = compareList === null ? [] : JSON.parse(compareList);
    let item = compareList.find(item => item.productId === this.vendorProduct.id);
    if (item) {
      this.messageService.showMessage({ type: 'info', title: 'Warning', body: 'Already added' });
      return;
    }
    if (compareList.length < 3) {
      this.messageService.showMessage({ type: 'success', title: 'Compare', body: 'Item added for compare' });
      this.commonService.notifyOther({ option: 'setProductCompareObj', value: obj });
    } else {
      this.messageService.showMessage({ type: 'info', title: 'Warning', body: 'Already 3 items in the list' });
    }

  }

}
