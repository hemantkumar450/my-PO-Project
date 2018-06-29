export class RequisitionInfo {
    id: number = 0;
    vendorId: number = 0;
    description: string = '';
    justification: string = '';
    poDate: Date;
    deliveryDate: Date;
    poCurrency: string = 'AED';
    budgeted: boolean = false;
    shipToLocationId: number = 0;
    amount: number = 0;
    totalDiscount: number = 0;
    poNumber: number = 0;
    status: number = 0;
    isPurchaseRequest: boolean = true;
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
    mobileNo: number = 0;
    email: string = '';
    purchaseRequest: PurchaseRequest = new PurchaseRequest();
    purchaseOrderAttachment: Array<PurchaseOrderAttachment> = [];
    purchaseOrderItem: Array<PurchaseOrderItem> = [];
    isRfq: boolean = false;
    rfqVendorId: number = 0;
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
    contractYear: number;
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
    price: number = 0;
    chargeAccountId: number = 0;
    rfqVendorId: number = 0;
}