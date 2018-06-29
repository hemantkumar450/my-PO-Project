export class UserModel {
    AttachmentId: number;
    ContactNo: number;
    Email: string;
    firstName: string;
    Gender: number;
    Id: number;
    LastName: string;
    MiddleName: string;
    UserName: string;
    userRoleIds: Array<number>;
    id:number;

}

export class UserRFQModel {
    id: number = 0;
    rfqId: number = 0;
    vendorId: number = 0;
    message: string;
    quoteName: string;
    deadline: string;
    creationDate: string;
    vendorName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    pduUserName: string;
    attachmentPath: string;
    attachmentName: string;
    attachmentUrl: string;
    rfqMessages: Array<RFQMessageModel> = [];
}

export class RFQMessageModel {
    attachmentName: string;
    attachmentPath: string;
    attachmentUrl: string;
    creationDate: string;
    firstName: string;
    id: number;
    isRead: boolean;
    isSentByVendor: boolean;
    lastName: string;
    message: string;
    middleName: string;
    pduUserName: string;
    rfqId: number;
    vendorId: number;
    vendorName: string;
}