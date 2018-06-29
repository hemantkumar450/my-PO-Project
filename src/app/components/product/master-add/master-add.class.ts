import { RolePermission, VendorService } from '../../vendor/shared';
import { Product } from '../shared';
import { Observable } from 'rxjs/internal/Observable';

export class MasterAddProductClass {
  constructor(public vendorService: VendorService) {

  }

  getProductById(productModel): any {
    let res: Product = new Product();
    const p = this.vendorService.getProductById(productModel.id).subscribe((response) => {
      /* get complete product list array in response  */
      return response;
    })
    // return p;


  }



}