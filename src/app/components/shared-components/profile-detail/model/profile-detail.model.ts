export class ProfileModel {
    id: number = 0;
    userName: string = '';
    userPwd: string = '';
    contactNo: string = '';
    email: string = '';
    gender: number = -1;
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    address: string = '';
    departmentId: number = 0;
    attachmentId: number = 0;
    attachmentUrl:string='';
    userStatusId: number = 0;
    isActive: true;
    newPassword: string = '';
    attachment: AttachmentModel = new AttachmentModel();
    userRoles: Array<UserRoleModel>=[];
    userRoleIds: Array<number>=[];
    userPermissions:Array<UserPermissionModel>=[];
    roleName:string='';
}

export class AttachmentModel {
    id: number = 0;
    attachmentName: string = '';
    attachmentPath: string = '';
    attachmentType: string = '';
    attachmentDataBase64: string = '';
    attachmentData: string = '';
    attachmentUrl: string = '';
}

export class UserPermissionModel {
    id: number =0;
    moduleName: string =''
    moduleDescription: string =''
    showVisible: boolean=false;
    showView: boolean=false;
    showAdd: boolean=false;
    showEdit: boolean=false;
    showApprove: boolean=false;
    isVisible: boolean=false;
    canView: boolean=false;
    canAdd: boolean=false;
    canEdit: boolean=false;
    canApprove: boolean=false;
}

export class UserRoleModel{
    id: number =0;
    userId: number =0;
    roleId: number =0;
    roleName: string ='';
}