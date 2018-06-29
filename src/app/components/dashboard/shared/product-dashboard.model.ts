export class ProductDashboardModel {
    attachments: Array<AttachmentModel> = []
    captionName: string = '';
    categories: Array<CategoriesModel> = [];
    id: number = 0;
    name: string = '';
    order: number = 0;
    products: Array<any> = [];
    vendors: Array<any> = []
}

export class AttachmentModel {
    attachmentName: string = '';
    attachmentPath: string = '';
    attachmentType: string = '';
    attachmentUrl: string = '';
    id: number = 0
    isActive: boolean= false;
    isDeleted: boolean= false;
    productId: number = 0
}

export class CategoriesModel {
    id:number=0;
    isActive:boolean=false;
    segmentCode:string=''
    segmentName:string=''
}

export class ProductsModel {

}

export class VendorsModel {

}
export interface MenuItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: string;
    routerLink?: any;
    queryParams?: { [k: string]: any };
    items?: MenuItem[]|MenuItem[][];
    expanded?: boolean;
    disabled?: boolean;
    visible?: boolean;
    target?: string;
    routerLinkActiveOptions?: any;
    separator?: boolean;
    badge?: string;
    badgeStyleClass?: string;
    style?:any;
    styleClass?:string;
    title?: string;
    id?: string;
    automationId?: any;
}