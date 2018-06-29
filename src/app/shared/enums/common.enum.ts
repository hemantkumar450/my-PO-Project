export enum CommonEnum {

}

export enum RoleEnum {
  Admin = 1,
  SubAdmin = 2,
  PDU = 3,
  Vendor = 4
}

export enum AssertTypeEnum {
  Image = 1,
  Video = 2,
  Pdf = 3
}

export enum QuestionTypeEnum {
  Text = 1,
  Attachment = 2,
  Yes_No = 3
}

export enum AttachmentTypeEnum {
  CompanyProfile = 'CompanyProfile',
  CompanyLicence = 'CompanyLicence',
  SMECertificate = 'SMECertificate',
  OrganisationChart = 'OrganisationChart',
  PolicyAttachment = 'PolicyAttachment'
}

export enum StatusTypeEnum {
  User = 1,
  Vendor = 2,
  VendorProduct = 3,
  PurchaseOrder = 4,
  RFQStatus = 5,
  UserDisable = 6
}

export enum StatusEnum {
  WaitingForApproval = 5,
  Approved = 6,
  Declined = 7,
  Blocked = 8
}

export enum SubAdminPermission {
  Dashboard = 1,
  EditProfile = 2,
  User = 8,
  Vendor = 9,
  VendorProducts = 10,
  ChangePassword = 3,
  CMS = 11,
}

export enum BulkUploadEnum {
  Products = 'Products',
  Vendors = 'Vendors',
  VendorProductLinking = 'VendorProductLinking',
  Users = 'Users',
}
export enum RFQStatusEnum {
  Initiated = 18,
  InProgress = 19,
  Completed = 20,
  Expired = 21
}

export enum VendorProductStatusEnum {
  WaitingForApproval = 9,
  Approved = 10,
  Declined = 11,
  Blocked = 12
}

export enum VendorEnum {
  WaitingForApproval = 5,
  Approved = 6,
  Declined = 7,
  Blocked = 8
}

