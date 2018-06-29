
export class ProductModel {
  id: number = 0;
  classId: number = 0;
  productId: number = 0;
  commodityId: number = 0;
  vendorId: number = 0;
  productDesc: string = '';
  productPrice: number = 0;
  productCode: string = '';
  productName: string = '';
  vendor: Vendor = new Vendor();
  vendorProductAttachments: Array<VendorProductAttachment> = new Array<VendorProductAttachment>();
  productProperties: Array<ProductProperty> = Array<ProductProperty>();
  productAttachments: Array<any> = [];
}


export class Vendor {
  vendorCode: string = '';
  vendorName: string = '';
  companyName: string = '';
  city: string = '';
  webSite: string = '';
  companyOwner: string = '';
  email: string = '';
  mobileNo: string = '';
}

export class VendorProductAttachment {
  id: number = 0;
  productId: number = 0;
  attachmentId: number = 0;
  vendorId: number = 0;
  attachmentName: string = '';
  attachmentPath: string = '';
  attachmentUrl: string = '';
}

export interface Category {
  id: number;
  segmentName: any;
  isActive: boolean;
  segmentCode: string;
}
export interface SubCatgory {
  id: number;
  familyName: any;
  isActive: boolean;
  familyCode: string;
}
export interface SuperSubCategory {
  id: number;
  familyName: any;
  isActive: boolean;
  familyCode: string;
}

export interface SelectItem {

}
export interface VendorProductList {
  Image;
  Title;
  Vendor;
  Price;
  TotalPrice;
  Qty;

}
export interface City {
  cityName;

}
export class CompareModel {
  id: number = 0;
  productCode: string = '';
  productPrice: number = 0;
  productName: string = '';
  productDesc: string = '';
  commodityId: number = 0;
  uomId: number = 0;
  modifiedBy: number = 0;
  modificationDate: string = '';
  createdBy: number = 0;
  creationDate: string = '';
  isActive: boolean = false;
  vendorCode: string = '';
  vendorName: string = '';
  productProperties: Array<ProductProperty> = Array<ProductProperty>();
  productAttachments: Array<VendorProductAttachment> = new Array<VendorProductAttachment>();
}


export class Product {
  id: number = 0;
  vendorProductStatusId: number = 0;
  uomId: number = 0;
  statusName: string = '';
  segmentName: string = '';
  familyName: string = '';
  className: string = '';
  commodityName: string = '';
  commodityId: number = 0;
  productId: number = null;
  productName: string = '';
  productPrice: number = null;
  productDesc: string = '';
  remarks: string = '';
  productCode: string = '';
  modifiedBy: number = 0;
  modificationDate: Date = new Date();
  createdBy: number = 0;
  creationDate: Date = new Date();
  isActive: boolean = false;
  productProperties: Array<ProductProperty> = [];
  productAttachments: Array<ProductAttachment> = [];
}


export class ProductAttachment {
  id: number = 0;
  productId: number = 0;
  attachmentId: number = 0;
  vendorProductId: number = 0;
  isVendorAttachment: boolean = false;
  attachmentName: string = '';
  attachmentPath: string = '';
  attachmentUrl: string = '';
  isDeleted: boolean = false;
}

export class ProductProperty {
  id: number = 0;
  productId: number = 0;
  propertyKey: string = '';
  propertyValue: string = '';
  vendorProductId: 0;
  isVendorProperty: boolean = false;
  isDeleted: boolean = false;
}
