import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/service';
import { DashboardService } from './shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Array<any> = [];
  categories: Array<any> = [];
  captionName: string = "";
  categoryImages: Array<any> = [];
  container_contents: Array<any> = [];
  constructor(
    private localStorageService: LocalStorageService,
    public dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getAllProducts();

  }

  getAllProducts() {
    this.dashboardService.getProductList().subscribe(res => {
      this.captionName = res[0].captionName;
      this.categories = res[0].categories;
      this.categoryImages = res[0].attachments;
      this.container_contents = res.filter((item, index) => {
        return index != 0;
      });
    });
  }

}
