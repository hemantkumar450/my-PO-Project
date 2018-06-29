export class RequestQuoteModel {
  id: number;
  message: string;
  quoteName: string;
  deadline: string;
  rfqNo: string;
  statusId: number;
  vendorIds: Array<number>;
  vendors: Array<any> = [];
  rfqVendors: Array<any> = [];
  isSelectedAllVendor = false;
  isPRGenerated = false;
  statusName: string;
  rfqItems: Array<RfqItemModel> = new Array<RfqItemModel>();
  rfqAttachments: Array<AttachmentModel> = new Array<AttachmentModel>();
  rfqQuestions: Array<RfqQuestionsModel> = new Array<RfqQuestionsModel>();
  constructor() {
    this.rfqItems.splice(this.rfqItems.length, -1, new RfqItemModel());
    this.rfqQuestions.splice(this.rfqQuestions.length, -1, new RfqQuestionsModel);
  }
}

export class RfqItemModel {
  id: number;
  rfqId: number;
  itemName: string;
  uomId: number;
  quantity: number;
  currencyCode = 'AED';
  uomName: string;
  isVendorItem: boolean;
  isEdited = false;
  isMouseClick = false;
  isEmpty: boolean;
  isVisibleRfq: boolean;

}
export class RequestQuotesQuestionModel {
  id: number;
  rfqVendorId: number;
  rfqQuestionId: number;
  questionResponse: string;
  attachmentId: number;
  responseDate: string;
  rfqId: number;
  question: string;
  inputTypeId: number;
  inputType: string;
  attachmentName: string;
  attachmentPath: string;
  attachmentUrl: string;
  attachementNameDisplay: string;
}

export class RfqQuestionsModel {
  id: number;
  rfqId: number;
  question: string;
  inputTypeId: number;
  isMouseClick: boolean;
} 

export class AttachmentModel {
  rfqId: number;
  attachmentId: number;
  attachmentName: string;
  attachmentPath: string;
  attachmentUrl: string;
  isDeleted: boolean;
}

export class RfqvendorQuotesModel {
  rfqVendorId: number;
  price: any;
  currencyCode = 'AED';
  attachmentId: number;
  isFinalQuote: boolean;
  attachmentName: string;
  attachmentPath: string;
  attachmentUrl: string;
  attachementNameDisplay: string;
  isVendorItem: boolean;
}
