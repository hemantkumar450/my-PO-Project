export class CartModel {
  id: number = 0;
  vendorProductId: number = 0;
  qty: number = 0;
  productPrice: number = 0;
  vendorName: string = '';
  totalPrice: number = 0;
  createdBy: number = 0;
  creationDate: Date = new Date();
  modifiedBy: number = 0;
  modificationDate: Date = new Date();
  isActive: boolean = false;
  isDelete: boolean = false;
  vendorId: number = 0;
}