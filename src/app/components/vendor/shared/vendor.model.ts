export class VendorModel {

}


export class VendorAddProduct {
  id: number = 0;
  vendorProductStatusId: number = 0;
  uomId: number = 0;
  statusName: string = '';
  segmentName: string = '';
  familyName: string = '';
  className: string = '';
  commodityName: string = '';
  commodityId: number = 0;
  productId: number = 0;
  productName: string = '';
  productPrice: number = null;
  productDesc: string = '';
  remarks: string = '';
  vendorProductAttachments: Array<VendorProductAttachment> = [];
  productProperties: Array<ProductProperty> = [];
}

export class Image {
  Id: number = 0;
  AttachmentName: string = '';
  AttachmentPath: string = '';
  AttachmentType: string = '';
  base64: string = '';
}

export class VendorProductAttachment {
  id: number = 0;
  productId: number = 0;
  attachmentId: number = 0;
  vendorId: number = 0;
  attachmentUrl: string = '';
  attachmentName: string = '';
  attachmentPath: string = '';
}

export class ProductProperty {
  Id: number = 0;
  productId: number = 0;
  propertyKey: string = '';
  propertyValue: string = '';
}

export class StatusModel {
  statusName: string;
  statusTypeId: number;
}

export class VendorRFQModel {
  id: number = 0;
  rfqId: number = 0;
  vendorId: number = 0;
  rfqVendorId: number;
  message: string;
  isRead: boolean = false;
  isSentByVendor: boolean = false;
  creationDate: string;
  vendorName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  pduUserName: string;
  attachmentPath: string;
  attachmentName: string;
  attachmentUrl: string;
  profileAttachmentUrl: string;
}

export class RolePermission {
  canAdd: boolean = false;
  canApprove: boolean = false;
  canEdit: boolean = false;
  canView: boolean = false;
  displayOrder: number = 0;
  id: number = 0;
  isActive: boolean = false;
  name: string = '';
  roleId: number = 0;
  routeUrl: string = '';
}
