import { Component, OnInit,Input } from '@angular/core';
import {VendorProductList, ProductService } from '../shared/index';
@Component({
  selector: 'app-product-feature-bar',
  templateUrl: './feature-bar.component.html',
  styleUrls: ['./feature-bar.component.css']
})

export class ProductFeatureBarComponent implements OnInit {
  vendorProductLists:VendorProductList[];
  constructor(private productService: ProductService) { }

  data: string;

  ngOnInit() {
  }


}
