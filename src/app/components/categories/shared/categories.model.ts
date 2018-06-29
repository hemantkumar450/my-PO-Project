export class SegementModel {
  createdBy: number;
  creationDate: string;
  id: number;
  isActive: boolean = false;
  segmentCode: string;
  segmentName: string;
  isChecked?: boolean;
  isfinallySubmitted?: boolean;
}

export class FamilyModel {
  familyCode: string;
  familyName: string;
  id: number;
  isActive: boolean;
  segmentId: number;
  segmentName: string;

}

export class ClassModel {
  classCode: string;
  className: string;
  createdBy: number;
  familyId: number;
  familyName: string;
  id: number;
  isActive: boolean;
}
