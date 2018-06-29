export class PurchaseOrderModel {
    id: number = 0;
    vendorId: number = 0;
    description: string = '';
    justification: string = '';
    poDate: Date = new Date();
    deliveryDate: Date;
    poCurrency: string = 'AED';
    budgeted: boolean = false;
    shipToLocationId: number = 1;
    amount: number = 0;
    totalDiscount: number;
    poNumber: number;
    status: number;
    isPurchaseRequest: boolean = false;
    orderById: number = 0;
    remarks: string = '';
    purchaseOrderDetailId: number = 0;
    purchaseRequestId: number = 0;
    isActive: boolean = true;
    buyerFirstName: string = '';
    buyerMiddleName: string = '';
    buyerLastName: string = '';
    buyerName: string = '';
    vendorName: string = '';
    vendorNumber: number = 0;
    website: string = '';
    mobileNo: number;
    email: string = '';
    purchaseOrderDetail: PurchaseOrderDetail = new PurchaseOrderDetail();
    purchaseRequest: PurchaseRequest;
    purchaseOrderAttachment: Array<PurchaseOrderAttachment> = [];
    purchaseOrderItem: Array<PurchaseOrderItem> = [];
    isRfq: boolean = false;
    rfqVendorId: number = 0;
}

export class PurchaseOrderDetail {
    id: number = 0;
    quoteRef: string = '';
    contactPerson: string = '';
    paymentTermId: number = 0;
    termDescription: string = '';
    sourceTypeId: number = 0;
    contractStartDate: Date;
    contractEndDate: Date;
    communityId: number = 0;
    contractTempReq: boolean = false;
    rateType: string = '';
    rateDate: Date;
    exchangeRate: number;

}

export class PurchaseRequest {
    id: number = 0;
    companyId: number = 0;
    departmentId: number = 0;
    subDepartmentId: number = 0;
    prTypeId: number = 0;
    requisitionClassificationId: number = 0;
    prCategoryId: number = 0;
    singleSourceJustificationId: number = 0;
    jobStartedJustification: string = '';
    preparerTelephone: string = '';
    contractTypeId: number = 0;
    contractYear: number = 0;
    fromDate: string;
    toDate: string;
    noteToBuyer: string = ''
}

export class PurchaseOrderAttachment {
    id: number = 0;
    purchaseOrderId: number = 0;
    attachmentId: number = 0;
}

export class PurchaseOrderItem {
    id: number = 0;
    purchaseOrderId: number = 0;
    commodityId: number = 0;
    productId: number = 0;
    uomId: number = 0;
    quantity: number = 0;
    toralPrice: number = 0;
    chargeAccountId: number = 0;
    productCode: string;
    productName: string;
    productPrice: number = 0;
    cartId: number = 0;
    rfqVendorId: number = 0;
}