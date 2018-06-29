
export class ClassModel {
    id: number = 0;
    commodityCode: string = '';
    commodityName: string = '';
    isActive: boolean = false;
    className: string = '';
    isSelected:boolean=false;
  }
  export class CommodityModel {
    id: number = 0;
    commodityCode: string = '';
    commodityName: string = '';
    classId: number = 0;
    isActive: boolean = false;
    className: string = '';
    isSelected:boolean=false;
  }
 
  export class CityModel {
    name: string = '';
  }
  
  export class ProsuctsModel {
    class: Array<any> = [];
    classId: number = 0;
    commodity: Array<any> = [];
    commodityId: number = 0;
    family: Array<any> = [];
    familyId: number = 0;
    productName: string = '';
    segment: any;
  }