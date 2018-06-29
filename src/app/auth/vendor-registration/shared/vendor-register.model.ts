export class VendorRegisterModel {
  id: number = 0;
  vendorCode: string = '';
  vendorName: string = '';
  companyName: string = '';
  address1: string = '';
  address2: string = '';
  city: string = '';
  zipCode: string = '';
  countryId: number;
  webSite: string = '';
  compProfileAttachId: number;
  compRegAttachId: number;
  companyRegNo: string = '';
  dateOfEstablishment: any;
  orgTypeId: number;
  otherOrganisation: string = '';
  smeRegistered: boolean;
  smeRegAttachId: number;
  orgChartAttachId: number;
  vatRegistrationNo: string = '';
  companyOwner: string = '';
  passportNo: string = '';
  contactPersonName: string = '';
  position: string = '';
  email: string = '';
  telephoneNo: string = '';
  mobileNo: string = '';
  convictions: boolean;
  bankruptcy: boolean;
  professionalMisconduct: boolean;
  competition: boolean;
  conflictOfInterest1: boolean;
  conflictOfInterest1Yes: string = '';
  deficienciesInPerformance: boolean;
  misleadingInfo: boolean;
  conductOfBusiness: boolean;
  financialStatus: boolean;
  financialStatusYes: string = '';
  financialStatusNo: string = '';
  parentCompany: boolean;
  parentCompanyYes: string = '';
  parentCompanyGuarantee: string = '';
  associationWithEmaarSupplier: boolean;
  associationWithEmaarSupplierYes: string = '';
  conflictOfInterest2: boolean;
  conflictOfInterest2Yes: string = '';
  vendorUserId: number;
  vendorStatusId: number;
  reviewedBy: number;
  reviewedDateTime: any;
  countryName: string = '';
  organisationType: string = '';
  companyTurnovers: Array<CompanyTurnoversModel> = [];
  vendorAccounts: Array<VendorAccountsModel> = [];
  attachments: Array<AttachmentModel> = [];
}

export class CompanyTurnoversModel {
  id = 0;
  vendorId: number;
  year: string = '';
  organisationAnnualTurnOver: string = '';
  groupAnnualTurnOver: string = '';
}


export class VendorAccountsModel {
  id: number;
  vendorId: number;
  bankDetails: string = '';
  accountName: string = '';
  accountNo: string = '';
  iban: string = '';
  swiftCode: string = '';
  paymentCurrency: string = '';
  nameOfBank: string = '';
  branchName: string = '';
  branchZipCode: number;
  branchCity: string = '';
  branchCountryId: number;
  businessActivitiesGroup: number;
  otherBusinessActivities: boolean;
  otherBusinessActivitiesOptional: string = '';
  resources: string = '';
  contact1: string = '';
  contact2: string = '';
  contact3: string = '';
  qualityStandards: boolean;
  otherQualityStandards: string = '';
  policies: boolean;
  otherPoliciesAttachmentId: number;
  otherRelevantInfo: boolean;
  otherRelevantInfoYes: string = '';
  declaration: boolean;
  declarationName: string = '';
  declarationPosition: string = '';
}

export class AttachmentModel {

  attachmentName = '';
  attachmentPath = '';
  attachmentType = '';
  isActive = true;
  attachmentUrl = '';
  productId = 0;
  isDeleted = true;
  id = 0;

}



export class FileModel {
  id: number = 0;
  attachmentName: string = '';
  attachmentPath: string = '';
  attachmentType: string = '';
  attachmentUrl: string = '';
  createdBy: number;
  creationDate: string = '';
  isActive: boolean = false;
  isDeleted: boolean = false;
}



