import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from '../../../shared/enums';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../../shared/service/common.service';
import { LocalStorageService } from '../../../shared/service';
import { MessageService } from '../../../shared/message/messageService.service';
import { CartService } from './shared/cart.service';
import { SharedService } from '../service/shared.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit, OnDestroy {
  isPDU: boolean = false;
  private subscription: Subscription;
  itemCount: number = 0;
  totalPrice: number = 0;

  constructor(public router: Router,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private messageService: MessageService,
    private commonService: CommonService,
    public sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.getUserDetail().subscribe(res => {
      const user: any = res;
      if (user.userRoleIds[0] === RoleEnum.PDU) {
        this.isPDU = true;
      }
    });

    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'setAddCart') {
        this.setAddCart();
      }
    });
    this.setAddCart();
  }

  openCartList() {
    this.router.navigate(['/cart']);
  }

  setAddCart() {
    this.cartService.updateAddCart().subscribe(response => {
      this.totalPrice = response.totalCartValue;
      this.itemCount = response.totalCartItems;
      const obj = {
        totalPrice: this.totalPrice,
        itemCount: this.itemCount
      };
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
