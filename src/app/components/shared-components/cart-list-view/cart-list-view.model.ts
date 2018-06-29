export class CartListView{
    id: number =0;
    purchaseOrderId: number =0;
    commodityId: number =0;
    productId: number =0;
    uomId: number =0;
    quantity: number =0;
    price: number =0;
    chargeAccountId: number =0;
}

export class CartModel {
    id: number = 0;
    vendorProductId: number = 0;
    qty: number = 0;
    productPrice: number = 0;
    totalPrice: number = 0;
    createdBy: number = 0;
    creationDate: Date = new Date();
    modifiedBy: number = 0;
    modificationDate: Date = new Date();
    isActive: boolean = false;
    isDelete: boolean = false;
    chargeAccountId:number=0;
  }