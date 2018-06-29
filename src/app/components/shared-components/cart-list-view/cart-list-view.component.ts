import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CartService } from '../../../components/cart-list/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { CartModel } from './cart-list-view.model';
import { PurchaseOrderService } from '../purchase-order/shared/purchase-order.service';

@Component({
    selector: 'app-cart-list-view',
    templateUrl: './cart-list-view.component.html',
})

export class CartListViewComponent implements OnInit {
    cartLists: Array<CartModel> = [];
    deletedIds: Array<number> = [];
    totalQty: number = 0;
    totalPrice: number = 0;
    isSelectedAll: boolean = false;
    POcharges: Array<any> = [];
    @Input() purchaseOrders: Array<any> = [];
    vendorId: number = 0;
    path:string='';
    @Output() cartItem = new EventEmitter();
    isRFQ:boolean=false;

    constructor(private purchaseOrderService: PurchaseOrderService,
        protected router: Router,
        protected route: ActivatedRoute ) {
        this.getPOChrges();
    }

    ngOnInit() {
        this.path = this.route.snapshot.routeConfig.path;
        this.path  =  this.path.substring(this.path.indexOf("/") + 1);
        let rfqId =  this.route.snapshot.params['rfqId'] || 0;
        if(rfqId !==0){
            this.vendorId = Number(this.route.snapshot.params['rfqId']) || 0;
            this.isRFQ=true;
        }else{
            this.vendorId = Number(this.route.snapshot.params['id']) || 0;
        }
        this.getPurchaseOrderItem();

    }

    getPurchaseOrderItem() {
        this.purchaseOrderService.getPurchaseOrder(this.isRFQ,this.vendorId).subscribe(result => {
            this.purchaseOrders = result;
            this.purchaseOrders.forEach(item => {
                item.productPrice += +item.totalPrice / +item.quantity;
            });
            this.cartItem.emit({item:this.purchaseOrders , isPOChargeChnaged:false})
        });
    }

    getPOChrges() {
        this.purchaseOrderService.getPOChargeAccount().subscribe((res) => {
            this.POcharges = res;
        });
    }

    onChargeAccountSelect(item) {
        let selectedItem = this.purchaseOrders.filter((i) => {
            if (item.id === i.cartId) {
                i.chargeAccountId = item.chargeAccountId;
            }
        })
        this.cartItem.emit({item:this.purchaseOrders , isPOChargeChnaged:true})
    }


}
