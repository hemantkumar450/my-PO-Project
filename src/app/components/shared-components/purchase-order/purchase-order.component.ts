import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../shared/message/messageService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../core/shared/service/core.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { PurchaseOrderService } from './shared/purchase-order.service';
import { PurchaseOrderModel, PurchaseOrderDetail } from './shared/purchase-order.model'
import { CartService } from '../../cart-list/shared';
import { CommonService } from '../../../shared/service/common.service';

@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
    styleUrls: ['./purchase-order.component.css']
})

export class PurchaseOrderComponent implements OnInit {
    paymentTerms: Array<any> = [];
    sourceType: Array<any> = [];
    shipTOLocation: Array<any> = [];
    communities: Array<any> = [];
    POChargeAccount: Array<any> = [];
    POCurrency: Array<any> = [];
    contracts: Array<any> = [];
    purchaseOrderModel: PurchaseOrderModel = new PurchaseOrderModel();
    path: string = '';
    minDate: Date = new Date();
    constructor(
        protected route: ActivatedRoute,
        private messageService: MessageService,
        private router: Router,
        public coreService: CoreService,
        public loaderService: LoaderService,
        public purchaseOrderService: PurchaseOrderService,
        private commonService: CommonService

    ) {
        this.getPaymentTerms();
        this.getsourceType();
        this.getshipTOLocation();
        this.getcommunities();
        this.getPOChargeAccount();
        this.getPOCurrency();
        this.getContract();
        this.purchaseOrderModel.id = this.route.snapshot.params.id === undefined
            ? 0 : Number(this.route.snapshot.params.id);
        if (this.purchaseOrderModel.id > 0) {
            // this.getPurchaseOrderById();
        }

    }

    ngOnInit() {
        let rfqId = this.route.snapshot.params['rfqId'] || 0;
        this.purchaseOrderModel.id = this.route.snapshot.params['poId'] || 0;
        this.purchaseOrderModel.vendorId = this.route.snapshot.params['id'] || 0;
        this.path = this.route.snapshot.routeConfig.path;
        this.path = this.path.substring(this.path.indexOf("/") + 1);
        rfqId > 0 ? this.purchaseOrderModel.isRfq = true : false;
        rfqId > 0 ? this.purchaseOrderModel.rfqVendorId = rfqId : 0;
        this.getSupplierDetail();
        // this.getProductAmount();
        if (this.path.indexOf('edit') !== -1) {
            this.getPurchaseOrderById()
        }
    }


    getSupplierDetail() {
        this.purchaseOrderService.getVendorByVendorId(+this.purchaseOrderModel.vendorId).subscribe((res) => {
            this.purchaseOrderModel.vendorName = res.vendorName;
            this.purchaseOrderModel.vendorNumber = res.vendorNumber;
            this.purchaseOrderModel.website = res.website;
            this.purchaseOrderModel.mobileNo = res.mobileNo;
            this.purchaseOrderModel.email = res.email;
            this.purchaseOrderModel.buyerName = res.buyerName;

        });
    }

    getPurchaseOrderById() {
        this.purchaseOrderService.getPurchaseOrderByPurchaseOrderId(this.purchaseOrderModel.id)
            .subscribe((res) => {
                if (res) {
                    this.purchaseOrderModel = res;
                    this.purchaseOrderModel.deliveryDate = new Date(res.deliveryDate);

                }
            });
    }

    getCartItem(cartItems) {
        this.purchaseOrderModel.purchaseOrderItem = cartItems.item;
        if(!cartItems.isPOChargeChnaged){
            this.purchaseOrderModel.purchaseOrderItem.forEach((item:any) => {
                this.purchaseOrderModel.amount = this.purchaseOrderModel.amount + item.totalPrice;
            })
        }
    }

    // getProductAmount() {
    //     this.purchaseOrderService.getCartList().subscribe(result => {
    //         if (result.length > 0) {
    //             this.purchaseOrderModel.amount=0;
    //             result.forEach((item)=>{
    //                 this.purchaseOrderModel.amount = this.purchaseOrderModel.amount+ item.totalPrice;
    //             })
    //             console.log( this.purchaseOrderModel.amount)
    //             // this.purchaseOrderModel.amount = result[0].totalPrice;
    //         }
    //     });
    // }

    getPaymentTerms() {
        this.purchaseOrderService.getPaymentTerms().subscribe((res) => {
            this.paymentTerms = res;
        });
    }

    getsourceType() {
        this.purchaseOrderService.sourceType().subscribe((res) => {
            this.sourceType = res;
        });
    }

    getshipTOLocation() {
        this.purchaseOrderService.shipToLocation().subscribe((res) => {
            this.shipTOLocation = res;
        });
    }

    getcommunities() {
        this.purchaseOrderService.community().subscribe((res) => {
            this.communities = res;
        });
    }

    getPOChargeAccount() {
        this.purchaseOrderService.poChargeAccount().subscribe((res) => {
            this.POChargeAccount = res;
        });
    }

    getPOCurrency() {
        this.POCurrency = this.purchaseOrderService.poCurrency();
    }

    getContract() {
        this.contracts = this.purchaseOrderService.contract();
    }


    onSave() {
        let count = 0;
        let errorMessage = '';
        if (this.purchaseOrderModel.purchaseOrderDetail.quoteRef === '') {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (this.purchaseOrderModel.purchaseOrderDetail.contactPerson === '') {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (this.purchaseOrderModel.purchaseOrderDetail.paymentTermId === 0) {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (this.purchaseOrderModel.purchaseOrderDetail.termDescription === '') {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (this.purchaseOrderModel.purchaseOrderDetail.sourceTypeId === 0) {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (this.purchaseOrderModel.shipToLocationId === 0) {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (this.purchaseOrderModel.poCurrency === '') {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (this.purchaseOrderModel.totalDiscount === undefined) {
            errorMessage = 'Please fill the mandatory fields';
        }
        if (this.purchaseOrderModel.description === '') {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (this.purchaseOrderModel.deliveryDate === undefined) {
            errorMessage = 'Please fill the mandatory fields';
            count++;
        }
        if (Number(this.purchaseOrderModel.totalDiscount) > Number(this.purchaseOrderModel.amount)) {
            errorMessage = 'Total Discount Can Not Be Greater Then Amount ';
            count++;
        }
        if (count === 0) {
            this.purchaseOrderModel.purchaseOrderItem.forEach(purchaseItem => {
                if (!purchaseItem.chargeAccountId) {
                    errorMessage = "Please select Charge Account in grid";
                    count++;
                }
            });
        }
        if (count > 0) {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: errorMessage });
            return;
        }


        this.purchaseOrderService.savePurchaseOrder(this.purchaseOrderModel).subscribe((res) => {
            this.messageService.showMessage({ type: 'success', title: 'Success', body: 'Record Save SucessFully' });
            this.onCancel();
            this.commonService.notifyOther({ option: 'setAddCart', value: {} });
        });
    }
    onCancel() {
        if (this.purchaseOrderModel.isRfq) {
            this.router.navigate(['user/rfq']);
        } else if (this.path == 'purchase-order') {
            this.router.navigate(['cart']);
        } else {
            this.router.navigate(['user/generated-pr']);
        }
    }
    onTotalDiscountInsert(totalDiscount) {
        if (+totalDiscount > +this.purchaseOrderModel.amount) {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: 'Total Discount Can Not Be Greater Then Amount' });
        }
    }


}
