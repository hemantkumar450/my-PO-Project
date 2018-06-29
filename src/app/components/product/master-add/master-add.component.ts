import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';
import { LocalStorageService } from '../../../shared/service/local-storage.service';
import { ApiUrl } from '../../../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleEnum, StatusTypeEnum, SubAdminPermission } from '../../../shared/enums';
import { MessageService } from '../../../shared/message/messageService.service';
import { LeftMenuService } from '../../../core/shared/left-menu/left-menu.service';
import { SharedService } from '../../../core/shared/service/shared.service';
import { RolePermission, VendorService } from '../../vendor/shared';
import { Product, ProductAttachment, ProductProperty, ProductService } from '../shared';

@Component({
  selector: 'app-product-master-add',
  templateUrl: './master-add.component.html',
  styleUrls: ['./master-add.component.css']
})

export class ProductMasterAddComponent implements OnInit {
  /* product list array for dropdown */
  products: Array<CustomDDO> = new Array<CustomDDO>();
  /* complete modal which will send later for save  */
  productModel: Product = new Product();
  /* product property list array to show properties key and values */
  /* use this bool varibale for admin visiblities  */
  isAdmin: boolean = false;
  /* status list array for Admin's approval dropdown */
  statusList: Array<CustomDDO> = new Array<CustomDDO>();
  /* open dialog for review */
  displayReviewDialog: boolean = false;
  /** role according left menu */
  rolePermission: RolePermission = new RolePermission();
  /** UOm list array */
  UOMList: Array<CustomDDO> = new Array<CustomDDO>();
  /** user info to get role */
  user: any;
  /** auto complete need defualt value so we created this variable */
  componentName: string = 'Commodity';
  /** product Mode check by this variable */
  isProductModeOn: boolean = false;
  /** vendor Mode check by this variable */
  isVendorModeOn: boolean = false
  /** Product add Mode check by this variable */
  isProductAddModeOn: boolean = false;
  /** Product add Mode check by this variable */
  isProductEditModeOn: boolean = false;
  isVendorAddProductModeOn: boolean = false;
  isVendorEditModeOn: boolean = false;

  constructor(
    /* injet vendor service to call its functions  */
    private vendorService: VendorService,
    public route: ActivatedRoute,
    private messageService: MessageService,
    protected router: Router,
    public leftMenuService: LeftMenuService,
    /* inject localstorage service to check whether user login or not  */
    private localStorageService: LocalStorageService,
    private productService: ProductService,
    /* inject this Httpclient service to send File upload request from controller */
    private http: HttpClient,
    public sharedService: SharedService
  ) {
    /** url split into part and find the exact mode(product or Vendor)*/
    let url = this.router.url.split('/');
    let count = 0;
    url.forEach(item => {
      /** check from the URL that is it admin or vendor */
      if (item === 'admin') {
        this.isProductModeOn = true;
        count++;
      }
      /** check from the URL that is it admin or vendor */
      if (item === 'vendor') {
        this.isVendorModeOn = true;
      }
      if (this.isVendorModeOn && item === 'edit') {
        this.isVendorEditModeOn = true;
      }
      /** if admin then check whether is it a edit mode or add mode */
      if (count > 0 && item === 'edit') {
        this.isProductEditModeOn = true;
      }
      // if (item === 'edit' && this.isVendorModeOn) {
      //   this.isVendorAddProductModeOn = true;
      // }
      /** if admin then check whether is it a edit mode or add mode */
      if (count > 0 && item === 'add') {
        this.isProductAddModeOn = true;
      }
    });

    /** set defualt Id */
    this.productModel.id = this.route.snapshot.params.id === undefined
      ? 0 : Number(this.route.snapshot.params.id);

    /* get current user */
    this.sharedService.getUserDetail().subscribe(res => {
      this.user = res;
      if (this.user.userRoleIds[0] === RoleEnum.Admin) {
        /* enabled Admin mode if role is admin */
        this.isAdmin = true;
      }
    });

    /* if id is available then will call the functions inside the condition */
    if (this.productModel.id !== 0) {
      this.getProductById();
      this.getStatusList();
    }
  }

  ngOnInit() {
    /* call default function when page load */
    this.getPermission();
    this.getUOMList();
  }

  getUOMList() {
    this.vendorService.getUOMList().subscribe((response) => {
      this.UOMList = response; /* get complete product list array in response  */
    });
  }

  getProductById() {
    /** if product mode on then first part will run
     * Otherwise second block will run
     */
    if (this.isProductModeOn) {
      this.productService.getProductById(this.productModel.id).subscribe((response) => {
        /* get complete product list array in response  */
        this.productModel = response;
      });
    } else {
      this.vendorService.getProductById(this.productModel.id).subscribe((response) => {
        /* get complete product list array in response  */
        this.productModel = response;
        this.getProducts();
      });
    }

  }

  /* define function to product list data */
  getProducts() {
    /* clear below array so that it could reset it on zero */
    this.products = [];
    /* call get product function of vendor service */
    this.vendorService.getProducts(this.productModel.commodityId).subscribe((response) => {
      /* get complete product list array in response  */
      const res = response;
      /* bind the data which is coming in the response */
      this.productModel.familyName = res.familyName;
      this.productModel.segmentName = res.segmentName;
      this.productModel.className = res.className;
      /* bind the product list */
      this.products = res.products;
      if (this.isVendorModeOn && !this.isAdmin && this.products.length === 0) {
      }
    });
  }

  getStatusList() {
    this.vendorService.getStatusList(StatusTypeEnum.VendorProduct).subscribe((response) => {
      /* get complete product list array in response  */
      this.statusList = response;
    });
  }

  /* define to get Product properties array when product is selected */
  populateProductProperties() {
    /* call get product properties function of vendor service */
    this.vendorService.populateProductProperties(this.productModel.productId).subscribe((response) => {
      /* get complete properties array from API */
      this.productModel.uomId = response.uomId;
      this.productModel.productDesc= response.productDesc;
      this.productModel.productProperties = response.productProperties;
      this.productModel.productAttachments = response.productAttachments;
    });
  }

  deleteImage(item: ProductAttachment,index:number) {
      /** isDeleted property is changed from false to true */
      if (item.id > 0) {
        item.isDeleted = true;
      } else {
        this.productModel.productAttachments.splice(index, 1);
      }
  }

  displayReviewEvent() {
    /* it define that admin can change the status */
    this.displayReviewDialog = !this.displayReviewDialog;
    this.productModel.remarks = '';
  }

  changeStatus() {
    if (this.productModel.vendorProductStatusId === 0) {
      return;
    }
    const obj = {
      vendorProductId: this.productModel.id,
      vendorProductStatusId: this.productModel.vendorProductStatusId,
      remarks: this.productModel.remarks
    };
    /* use to set the status of vendor add product by admin or sub admin */
    this.vendorService.changeStatus(obj).subscribe((response) => {
      /** route the page according to its role */
      if (this.user.userRoleIds[0] === RoleEnum.Vendor) {
        this.router.navigate(['vendor/products']);
      } else if (this.user.userRoleIds[0] === RoleEnum.Admin || this.user.userRoleIds[0] === RoleEnum.SubAdmin) {
        this.router.navigate(['admin/vendor-product']);
      }
    });
  }

  /* define to submit the response whether its an vendor or admin */
  productLinkByVendor() {

    if (this.productModel.commodityId === 0) {
      this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Please select Commodity' });
      return;
    }

    /** checking the productProperties length and will pop error message if user leave it blank */
    if (this.productModel.productProperties.length > 0) {
      let count = 0;
      this.productModel.productProperties.forEach(value => {
        /** checking user is not leaving the blank properties */
        if ((value.propertyKey.trim() === '' || value.propertyValue.trim() === '') && !value.isDeleted) {
          count++;
        }
      });
      if (count > 0) {
        this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Please fill properties fields' });
        return;
      }
    }

    /* condition for validation check */
    if (this.productModel.productDesc.trim() === '') {
      this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Please fill mandatory fields' });
      return;
    }

    /** condition for checking the error of Vendor Product) */
    if (!this.isProductModeOn) {
      if (!this.productModel.uomId || this.productModel.uomId === 0 ||
        !this.productModel.productPrice || this.productModel.productPrice === 0) {
        this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Please fill mandatory fields' });
        return;
      }
    }

    if (this.isVendorAddProductModeOn && !this.isAdmin) {
      if (this.productModel.productCode.trim() === '' || this.productModel.productDesc.trim() === '') {
        this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Please fill mandatory fields' });
        return;
      }
    }

    this.productModel.productId = this.productModel.productId === null ? 0 : this.productModel.productId;
    if (this.isProductModeOn) {
      if (this.productModel.productName.trim() === '' || this.productModel.productCode.trim() === '') {
        this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Please fill mandatory fields' });
        return;
      }
      const obj = {
        id: this.productModel.id,
        productCode: this.productModel.productCode,
        productName: this.productModel.productName,
        productDesc: this.productModel.productDesc,
        commodityId: this.productModel.commodityId,
        productProperties: this.productModel.productProperties,
        productAttachments: this.productModel.productAttachments,
        commodityName: '',
        isActive: true
      };

      /** call API for Product saving */
      this.productService.saveProduct(obj).subscribe((response) => {
        this.router.navigate(['/admin/products']); /* route back on dashboard tab */
      });
    } else {
      /* calling method to save linking product with vendor */
      this.vendorService.productLinkByVendor(this.productModel).subscribe((response) => {
        this.router.navigate(['/vendor/product-linking']); /* route back on dashboard tab */
      });
    }
  }

  /* images upload function */
  upload(files) {
    /* condtion check for if file exists or not */
    if (files.length !== 0 && this.productModel.productId !== 0
      || files.length !== 0 && this.isProductAddModeOn
      || files.length !== 0 && this.isVendorAddProductModeOn) {
      const formData = new FormData(); /* form data save the image inside it  */
      for (const file of files) {
        formData.append(file.name, file); /* append image inside fordata */
      }

      /* check token is there or not  */
      const access_token = this.localStorageService.getAccessToken();
      let url = ApiUrl.baseUrl; /* Dynamic API comes from api.service.ts */
      this.http.post(url + `Attachment/VendorProductUpload/` + this.productModel.productId, formData, {
        headers: new HttpHeaders({
          'Authorization': `${access_token}`
        })
      }).subscribe((res: any) => {
        /* if image saved then come with data */
        if (!ApiUrl.prodMode) {
          /* creating url for showing images in the browser */
          url = ApiUrl.baseUrl.substring(0, ApiUrl.baseUrl.lastIndexOf('/a') + 1);
        }
        res.forEach(element => {
          const obj: ProductAttachment = new ProductAttachment();
          obj.productId = this.productModel.productId === null ? 0 : this.productModel.productId;
          obj.attachmentId = element.id;
          obj.attachmentUrl = element.attachmentUrl;
          if (this.isVendorModeOn && !this.isAdmin) {
            obj.isVendorAttachment = true;
          }
          /* splice imgaes in array */
          this.productModel.productAttachments
            .splice(this.productModel.productAttachments.length, 0, obj);
        });
      });
    } else {
      /** pop up error message if file is not there */
      this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Please select product before browse image' });
    }
  }

  /** define this for get the role according to the left menu */
  getPermission(): void {
    let leftMenues = null;
    this.leftMenuService.getLeftMenu().subscribe(leftMenu => {
      leftMenues = leftMenu;
    });
    if (leftMenues && leftMenues.length > 0) {
      leftMenues.map(menu => {
        if (menu.id === SubAdminPermission.VendorProducts &&
          menu.roleId === RoleEnum.SubAdmin || menu.roleId === RoleEnum.Admin) {
          /** role Permission will see if user is a subAdmin or Admin */
          this.rolePermission = menu;
        }
      });
      if (this.rolePermission.canApprove) {
        this.isAdmin = true;
      }
    }
  }

  decimalCheckEvent() {
    /** round off the number into two decimal value  */
    this.productModel.productPrice = +this.productModel.productPrice;
    this.productModel.productPrice = +this.productModel.productPrice.toFixed(2);
  }

  /** define to get the emitter from auto complete textbox event */
  getSearchTextEvent(item) {
    /** transfer the data which comes from auto complete component */
    this.productModel.commodityId = item.id;
    this.isVendorAddProductModeOn = false;
    this.getProducts();
  }

  addNewProperties() {
    /** add new properties */
    const obj: ProductProperty = {
      id: 0,
      productId: this.productModel.productId !== 0 ? 0 : this.productModel.productId,
      propertyKey: '',
      propertyValue: '',
      isVendorProperty: false,
      vendorProductId: 0,
      isDeleted: false
    };
    if (this.isVendorModeOn && !this.isAdmin && this.products.length === 0) {
      obj.isVendorProperty = true;
    }

    let count = 0;
    this.productModel.productProperties.forEach(value => {
      /** checking user is not leaving the blank properties */
      if (value.propertyKey.trim() === '' && !value.isDeleted || value.propertyValue.trim() === '' && !value.isDeleted) {
        count++;
      }
    });
    if (count === 0) {
      this.productModel.productProperties.splice(this.productModel.productProperties.length, 0, obj);
    } else {
      this.messageService.showMessage({ type: 'info', title: 'Error', body: 'Please enter the existing property' });
      return;
    }

  }

  addDeleteProperties(item: ProductProperty, index: number) {
    /** isDeleted property is changed from false to true */
    if (item.id > 0) {
      item.isDeleted = true;
    } else {
      this.productModel.productProperties.splice(index, 1);
    }

  }

  vendorAddProductEvent() {
    this.productModel.productId = 0;
    this.productModel.productAttachments = [];
    this.productModel.productProperties = [];
    this.productModel.productDesc = '';
    this.productModel.productPrice = null;
    this.productModel.uomId = 0;
    this.isVendorAddProductModeOn = true;
  }

}
