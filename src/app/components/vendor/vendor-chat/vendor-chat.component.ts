import { Component, OnInit } from '@angular/core';
import { VendorService } from '..';
import { VendorRFQModel } from '../shared';
import { PaginationService } from '../../../shared/service/pagination.service';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-chat',
  templateUrl: './vendor-chat.component.html',
  styleUrls: ['./vendor-chat.component.css']
})
export class VendorChatComponent implements OnInit {
  rfqList: Array<VendorRFQModel> = [];
  totalRecords: Number = 0;
  pageSize: Number = PaginationEnum.PageSize;
  page: number = 0;
  rfqId: number = 0;
  isVendor = true;
  constructor(
    private vendorService: VendorService,
    private paginationService: PaginationService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.rfqId = +this.route.snapshot.params['id'];
    if (this.rfqId > 0) {
      this.getVendorChatList();
    }
  }

  getVendorChatList() {
    this.vendorService.getVendorChatList(this.rfqId).subscribe((response) => {
      this.rfqList = response;
    });
  }

}
