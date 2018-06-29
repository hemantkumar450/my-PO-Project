import { Component, OnInit } from '@angular/core';
import { CartService, CartModel } from './shared';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from '../../shared/message/messageService.service';
import { CommonService } from '../../shared/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})

export class CartListComponent implements OnInit {
  cartLists: Array<CartModel> = [];
  deletedIds: Array<number> = [];
  totalQty: number = 0;
  totalPrice: number = 0;
  isSelectedAll: boolean = false;
  rowGroupMetadata: any;
  testArray: any;

  constructor(private cartService: CartService,
    private messageService: MessageService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    protected router: Router, ) {
    this.getCartList();
  }

  ngOnInit() { }



  getCartList() {
    this.cartService.getCartList().subscribe(result => {
      this.totalPrice = 0;
      this.totalQty = 0;
      this.cartLists = result;
      this.cartLists.forEach(item => {
        item.isDelete = false;
        this.totalPrice += +item.productPrice * item.qty;
        this.totalQty += item.qty;
      });
    });
  }

  updateCart() {
    this.cartService.updateCartList(this.cartLists).subscribe(result => {
      let message = 'cart is updated';
      this.messageService.showMessage({ type: 'success', title: 'Update', body: message });
      this.getCartList();
      this.commonService.notifyOther({ option: 'setAddCart', value: true });
    });
  }

  deleteAllCart() {
    this.cartLists.forEach(item => {
      if (item.isDelete) {
        this.deletedIds.splice(this.deletedIds.length, 0, item.id);
      }
    });
    if (this.deletedIds.length === 0) {
      let message = 'please select items before delete';
      this.messageService.showMessage({ type: 'error', title: 'Warning', body: message });
      return;
    }
    this.deleteServiceCall(this.deletedIds);
  }

  deleteCartItem(item) {
    this.confirmationService.confirm({
      message: 'Are you sure, You want to delete this item?',
      accept: () => {
        let ids = [item.id];
        this.deleteServiceCall(ids);
      }
    });
  }

  deleteServiceCall(deletedIds) {
    this.cartService.deleteCartList(deletedIds).subscribe(result => {
      this.deletedIds = [];
      this.getCartList();
      this.commonService.notifyOther({ option: 'setAddCart', value: true });
    });
  }

  quatityKeydownEvent(selectedItem) {
    console.log(selectedItem)
    if (+selectedItem.qty === 0) {
      selectedItem.qty = 1;
      this.messageService.showMessage({ type: 'info', title: 'Warning', body: 'one item should be there' });
    }
    selectedItem.qty = +selectedItem.qty;
    selectedItem.qty = parseInt(selectedItem.qty).toFixed(2);
    this.totalPrice = 0, this.totalQty = 0;
    this.cartLists.forEach(item => {
      this.totalPrice += +item.productPrice * +item.qty;
      this.totalQty += +item.qty;
    })
  }

  selectAllEvent() {
    this.cartLists.forEach(item => {
      item.isDelete = this.isSelectedAll;
    });
  }

  onPRGenerate(item: any , rowData) {
    if (item.totalPrice <= 100000) {
      this.router.navigate(['cart/pr/' + rowData.vendorId + '/purchase-order']);
    } else if (this.totalPrice > 10000 ) {
      this.router.navigate(['cart/pr/' + rowData.vendorId + '/requisition-info']);
    }
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.cartLists) {
      let carts = this.cartLists.sort((a, b) => {
        var nameA = a.vendorName.toLowerCase(), nameB = b.vendorName.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      });
      for (let i = 0; i < carts.length; i++) {

        let rowData = carts[i];
        let vendorName = rowData.vendorName;
        if (i == 0) {
          this.rowGroupMetadata[vendorName] = { index: 0, size: 1, totalQty: rowData.qty, totalPrice: rowData.productPrice * rowData.qty };
        }
        else {
          let previousRowData = carts[i - 1];
          let previousRowGroup = previousRowData.vendorName;
          if (vendorName === previousRowGroup) {
            this.rowGroupMetadata[vendorName].size++;
            this.rowGroupMetadata[vendorName].totalPrice += rowData.productPrice * rowData.qty;
            this.rowGroupMetadata[vendorName].totalQty += rowData.qty;
          } else {
            this.rowGroupMetadata[vendorName] = { index: i, size: 1, totalQty: rowData.qty, totalPrice: rowData.productPrice * rowData.qty };
          }
        }
      }
    }
  }

  // onSort() {
  //   this.updateRowGroupMetaData();
  // }

}
