import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../shared/message/messageService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../shared/service';
import { CoreService } from '../../../core/shared/service/core.service';
import { CommonService } from '../../../shared/service/common.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { RequisitionInfo } from './shared/requisition-info.model';
import { RequisitionInfoService } from './shared/requisition-info.service';

@Component({
    selector: 'app-requisition-info',
    templateUrl: './requisition-info.component.html',
    styleUrls: ['./requisition-info.component.css']
})

export class RequisitionInfoComponent implements OnInit {

    requisitionModel: RequisitionInfo = new RequisitionInfo;
    companies: Array<any> = [];
    departments: Array<any> = [];
    PRtypes: Array<any> = [];
    requisitionClassification: Array<any> = [];
    shipToLocation: Array<any> = [];
    subDepartment: Array<any> = [];
    PRCategory: Array<any> = [];
    singleSourceJustification: Array<any> = [];
    budget: Array<any> = [];
    contractTypes: Array<any> = [];
    path: string = '';
    minDate: Date = new Date();

    constructor(
        protected route: ActivatedRoute,
        private messageService: MessageService,
        private router: Router,
        public coreService: CoreService,
        public loaderService: LoaderService,
        public requisitionInfoService: RequisitionInfoService,
        private commonService: CommonService
    ) {
        this.getCompanyList();
        this.getDepartments();
        this.getPRType();
        this.getRequisitionClassification();
        this.getShipToLocation();
        this.getPRCategory();
        this.getBudget();
        this.getContractType();
        this.getSingleSourceJustification();
    }

    ngOnInit() {
        this.path = this.route.snapshot.routeConfig.path;
        this.path = this.path.substring(this.path.indexOf("/") + 1);
        this.requisitionModel.vendorId = this.route.snapshot.params['id'] || 0;
        let rfqId = this.route.snapshot.params['rfqId'] || 0;
        rfqId > 0 ? this.requisitionModel.isRfq = true : false;
        rfqId > 0 ? this.requisitionModel.rfqVendorId = rfqId : 0;
        this.requisitionModel.id = this.route.snapshot.params['prId'] || 0;
        if (this.path.indexOf('edit') !== -1) {
            this.getPurchaseRequestById()
        }
    }

    getCartItem(cartItems) {
        this.requisitionModel.purchaseOrderItem = cartItems.item;
        if(!cartItems.isPOChargeChnaged){
            this.requisitionModel.purchaseOrderItem.forEach((item:any) => {
                this.requisitionModel.amount = this.requisitionModel.amount + item.totalPrice;
            })
        }
       
    }

    getCompanyList() {
        this.requisitionInfoService.getCompanies().subscribe((res) => {
            this.companies = res;
        });
    }


    getPurchaseRequestById() {
        this.requisitionInfoService.getPurchaseRequestById(this.requisitionModel.id)
            .subscribe((res) => {
                if (res) {
                    this.requisitionModel = res;
                    this.requisitionModel.deliveryDate = new Date(res.deliveryDate);
                    this.getSubDepartment(this.requisitionModel.purchaseRequest.departmentId)
                }
            });
    }

    getDepartments() {
        this.requisitionInfoService.getDepartments().subscribe((res) => {
            this.departments = res;
        });
    }

    getSubDepartment(departmentId) {
        this.requisitionInfoService.getSubDepartment(departmentId).subscribe((res) => {
            this.subDepartment = res;
        });
    }

    getSingleSourceJustification() {
        this.requisitionInfoService.getSingleSourceJustification().subscribe((res) => {
            this.singleSourceJustification = res;
        });
    }

    getPRCategory() {
        this.requisitionInfoService.getPRCategory().subscribe((res) => {
            this.PRCategory = res;
        });
    }

    getPRType() {
        this.requisitionInfoService.getPRType().subscribe((res) => {
            this.PRtypes = res;
        });
    }

    getRequisitionClassification() {
        this.requisitionInfoService.getRequisitionClassification().subscribe((res) => {
            this.requisitionClassification = res;
        });
    }

    getShipToLocation() {
        this.requisitionInfoService.getShipToLocation().subscribe((res) => {
            this.shipToLocation = res;
        });
    }

    getBudget() {
        this.budget = this.requisitionInfoService.getBudget();
    }

    getContractType() {
        this.requisitionInfoService.getContractType().subscribe((res) => {
            this.contractTypes = res;
        });
    }

    onSave() {
        let count = 0;
        let errorMessage = '';
        if (this.requisitionModel.purchaseRequest.companyId == 0) {
            errorMessage = 'Please select or fill the mandatory fields';
            count++;
        }
        if (this.requisitionModel.purchaseRequest.departmentId == 0) {
            errorMessage = 'Please select or fill the mandatory fields';
            count++;
        }
        if (this.requisitionModel.purchaseRequest.prTypeId == 0) {
            errorMessage = 'Please select or fill the mandatory fields';
            count++;
        }
        if (this.requisitionModel.purchaseRequest.requisitionClassificationId == 0) {
            errorMessage = 'Please select or fill the mandatory fields';
            count++;
        }
        if (this.requisitionModel.purchaseRequest.prCategoryId == 0) {
            errorMessage = 'Please select or fill the mandatory fields';
            count++;
        }
        if (this.requisitionModel.purchaseRequest.singleSourceJustificationId == 0) {
            errorMessage = 'Please select or fill the mandatory fields'
            count++;
        }
        if (this.requisitionModel.purchaseRequest.jobStartedJustification == '') {
            errorMessage = 'Please select or fill the mandatory fields'
            count++;
        }
        if (this.requisitionModel.description == '') {
            errorMessage = 'Please select or fill the mandatory fields';
            count++;
        }
        if (this.requisitionModel.deliveryDate === undefined) {
            errorMessage = 'Please select or fill the mandatory fields'
            count++;
        }
        if (this.requisitionModel.shipToLocationId === 0) {
            errorMessage = 'Please select or fill the mandatory fields'
            count++;
        }
        if (count === 0) {
            this.requisitionModel.purchaseOrderItem.forEach(purchaseItem => {
                if (!purchaseItem.chargeAccountId) {
                    errorMessage = "Please select change account in grid";
                    count++;
                }
            })
        }
        if (count > 0) {
            this.messageService.showMessage({ type: 'error', title: 'Error', body: errorMessage });
            return;
        }

        this.requisitionInfoService.savePurchaseRequest(this.requisitionModel).subscribe((res) => {
            this.messageService.showMessage({ type: 'success', title: 'Success', body: 'Record Save SucessFully' });
            this.onCancel();
            this.commonService.notifyOther({ option: 'setAddCart', value: {} });
        })
    }

    onCancel() {
        if (this.requisitionModel.isRfq) {
            this.router.navigate(['user/rfq']);
        } else if (this.path == 'requisition-info') {
            this.router.navigate(['cart']);
        } else if (this.requisitionModel.id > 0) {
            this.router.navigate(['user/generated-pr']);
        }
    }

}
