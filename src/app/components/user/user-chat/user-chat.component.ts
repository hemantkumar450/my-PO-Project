import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../../shared/service/pagination.service';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRFQModel } from '../user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserrChatComponent implements OnInit {
  rfqList: Array<UserRFQModel> = [];
  totalRecords: Number = 0;
  pageSize: Number = PaginationEnum.PageSize;
  page: number = 0;
  rfqId: number = 0;
  vendorId: number = 0;
  isUser = true;
  constructor(
    private userService: UserService,
    private paginationService: PaginationService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.rfqId = +this.route.snapshot.params['rfqId'];
    this.vendorId = + this.route.snapshot.params['vendorId']
    if (this.rfqId > 0 && this.vendorId > 0) {
      this.getUserChatList();
    }
  }

  getUserChatList() {
    this.userService.getUserChatList(this.rfqId, this.vendorId).subscribe((response) => {
      this.rfqList = response;
    });
  }

}
