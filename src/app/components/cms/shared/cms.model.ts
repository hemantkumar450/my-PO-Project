import { SegementModel } from '../../categories/shared/categories.model';
export class CmsModel {
    id: number;
    name: string;
    Order: number;
    captionName: string;
    categories: Array<SegementModel>;
    products: Array<ProductModel> = new Array<ProductModel>();
    vendors: Array<VendorModel> = new Array<VendorModel>();
    attachments: Array<AttachmentModel> = new Array<AttachmentModel>();
    constructor() {
        this.categories = new Array<SegementModel>();
    }
}

export class AttachmentModel {
    attachmentName: string;
    attachmentPath: string;
    attachmentType: string;
    attachmentUrl: string;
    createdBy: number;
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    productId: number;
}

export class ProductModel {
    id: number;
    productId: number;
    vendorProductid: number;
    productCode: string;
    productName: string;
    productDesc: string;
    classId: number;
    uOMId: number;
    vendorCode: string;
    vendorName: string;
    isChecked: boolean;
    isfinallySubmitted: boolean;
    productProperties: Array<any> = [];
    productAttachments: Array<any> = [];

}

export class VendorModel {
    vendorId: number;
    vendorName: string;
    vendorCode: string;
    companyName: string;
    address1: string;
    address2: string;
    city: string;
    zipCode: string;
    countryName: string;
    contactPersonName: string;
    mobileNo: string;
    attachmentPath: string;
    attachmentName: string;
    vendorLogo: string;
    isChecked: boolean;
    isfinallySubmitted: boolean;
}

