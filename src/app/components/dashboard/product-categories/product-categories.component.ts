import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../shared/product-dashboard.model';
import { DashboardService } from '../shared/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../shared/loader/loader.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  @Input() categories: Array<any> = [];
  families: Array<any> = [];
  classes: Array<any> = [];
  commodities: Array<any> = [];
  @Input() captionName:string=" ";
  constructor(private dashboardService: DashboardService,
    protected router: Router,
  private loaderService:LoaderService) {}

  ngOnInit() {

  }

  showMenuItems(event) {
   
  }

  getFamilyBySegmentId(item) {
    this.families = this.families.filter(e => {
      return e.segmentId == item.id;
       
    });
    if (this.families.length > 0) {
      return;
    }
    this.dashboardService.getFamilyList(item.id).subscribe(data => {
      this.families = data;
    });
  }

  getClassByFamilyId(item) {
     this.classes = this.classes.filter(e => { 
       return e.familyId == item.id; 
      });
    if (this.classes.length > 0) {
      return;
    }
    this.dashboardService.getClassList(item.id).subscribe(data => {
      this.classes = data;
    });
  }

  getCommodityByClassId(item) {
    this.commodities = this.commodities.filter(e => { 
      return e.classId == item.id; 
    });
    if (this.commodities.length > 0) {
      return;
    }
    this.dashboardService.getCommodityList(item.id).subscribe(data => {
      this.commodities = data;
    });
  }

  onClick(event, name) {
    this.router.navigate(['product/product-list/' + event.id + '/' + name]);

  }

}
