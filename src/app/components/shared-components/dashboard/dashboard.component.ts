import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService, DashboardModel } from './shared';
import { UIChart } from 'primeng/chart';
import { RoleEnum, VendorProductStatusEnum, VendorEnum, RFQStatusEnum } from '../../../shared/enums';
import { SharedService } from '../../../core/shared/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../shared/service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class AppDashboardComponent implements OnInit {
  data: any;
  lables: Array<string> = ['a', 'as'];
  options: any;
  pieChartData: Array<number> = [15, 25];
  dashboardData: DashboardModel = new DashboardModel();
  userRoleId: number = 0;
  @ViewChild('chart') chart: UIChart;
  pieData: any;
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    public route: ActivatedRoute,
    public sharedService: SharedService,
    private commonService: CommonService
  ) {
    this.sharedService.getUserDetail().subscribe(res => {
      this.userRoleId = res.userRoleIds[0];
    });
    // this.userRoleId = this.checkUserRole();
    this.generatePieChart();
    this.getDashboard();
  }

  ngOnInit() {
    this.generatePieChart();
    this.getDashboard();
  }

  generatePieChart() {
    this.data = {
      labels: this.lables,
      datasets: [
        {
          data: this.pieChartData,
          backgroundColor: [
            "#57575c",
            "#fdd933",
            '#ce93d8',
            '#90caf9',
            '#b2dfdb',
            '#dce775',
            '#9e9e9e',
            '#ffd740',
            '#388e3c'
          ],
        }]
    }

    this.options = {
      legend: {
        position: 'right',
        verticalAlign: "center",
        align: 'center',
        labels: {
          fontSize: 10,
          align: 'center',
          padding: 10,
          boxWidth: 50,
        }
      },
      title: {
        fontSize: 10
      }
    };
  }

  checkUserRole() {
    this.sharedService.getUserDetail().subscribe(res => {
      return res.userRoleIds[0];
    });

  }

  getDashboard() {
    this.dashboardService.getDashboard().subscribe(response => {
      this.dashboardData = response;
      this.lables = [];
      this.pieChartData = [];
      if (this.userRoleId !== RoleEnum.PDU) {
        for (let property in response) {
          if (this.userRoleId === RoleEnum.Admin || this.userRoleId === RoleEnum.SubAdmin) {
            if (property === 'pendingVendorApproval'
              || property === 'approvedVendor'
              || property === 'declinedVendor') {
              let value = '';
              if (property === 'pendingVendorApproval') {
                value = 'PENDING VENDOR APPROVAL';
              } else {
                value = property.toUpperCase().split('VENDOR').join(' VENDOR')
              }
              this.lables.splice(this.lables.length, 0, value);
              this.pieChartData.splice(this.pieChartData.length, 0, response[property]);
            }
          }
          if (this.userRoleId === RoleEnum.Vendor) {
            if (property === 'inProgressRFQ'
              || property === 'totalRFQ') {
              let value = property.toUpperCase().split('RFQ').join(' RFQ')
              this.lables.splice(this.lables.length, 0, value);
              this.pieChartData.splice(this.pieChartData.length, 0, response[property]);
            }
          }
        }
      }
      this.data.labels = this.lables;
      this.data.datasets[0].data = this.pieChartData;
      if (this.chart) {
        this.chart.refresh();
      }
    });
  }

  totalProduct() {
    this.router.navigate(['admin/products']);
    const obj = {
      href: 'admin/products/',
      id: 20,
      name: 'Products'
    };
    this.commonService.notifyOther({ option: 'leftMenuItem', value: obj });
  }

  totalVendor() {
    this.router.navigate(['admin/vendors']);
    const obj = {
      href: 'admin/vendors/',
      id: 5,
      name: 'Vendors'
    };
    this.commonService.notifyOther({ option: 'leftMenuItem', value: obj });
  }

  linkedProduct() {
    this.router.navigate(['vendor/product-linking']);
  }


  pendingVendor() {
    this.router.navigate(['admin/vendor-product'], {
      queryParams: {
        matchMode: undefined,
        value: VendorProductStatusEnum.WaitingForApproval,
      }
    });
    const obj = {
      href: 'admin/vendor-product/',
      id: 6,
      name: 'Vendor Products'
    };
    this.commonService.notifyOther({ option: 'leftMenuItem', value: obj });
  }

  selectData(event) {
    let valueType;
    switch (event.element._view.label) {
      case 'PENDING VENDOR APPROVAL':
        valueType = VendorEnum.WaitingForApproval;
        break;

      case 'DECLINED VENDOR':
        valueType = VendorEnum.Declined;
        break;


      case 'APPROVED VENDOR':
        valueType = VendorEnum.Approved;
        break;

      case 'INPROGRESS RFQ':
        valueType = RFQStatusEnum.InProgress;
        break;

      default:
        break;
    }
    if (this.userRoleId === 1 || this.userRoleId === 2) {
      this.router.navigate(['admin/vendors'], {
        queryParams: {
          matchMode: undefined,
          value: valueType,
        }
      });
      this.pieData = {
        href: 'admin/vendors/',
        id: 5,
        name: 'Vendors'
      };
    }
    if (this.userRoleId === 4) {
      this.router.navigate(['vendor/rfq'], {
        queryParams: {
          matchMode: undefined,
          value: valueType,
        }
      });
      this.pieData = {
        href: 'vendor/rfq/',
        id: 14,
        name: "RFQ's"
      };
    }
    this.commonService.notifyOther({ option: 'leftMenuItem', value: this.pieData });
  }

  productInCart() {
    this.router.navigate(['cart']);
  }

  generateRFQ() {
    this.router.navigate(['user/rfq']);
    const obj = {
      href: 'user/rfq/',
      id: 12,
      name: "RFQ's"
    };
    this.commonService.notifyOther({ option: 'leftMenuItem', value: obj });
  }

}
