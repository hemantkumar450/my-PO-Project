export class ChatModel {
  id: number;
  rfqId: number;
  rfqVendorId: number;
  vendorId: number;
  message: string;
  isRead: boolean = false;
  isSentByVendor: boolean = true;
}
