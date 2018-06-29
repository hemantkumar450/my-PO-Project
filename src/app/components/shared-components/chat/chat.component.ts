import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../../shared/message/messageService.service';
import { PaginationEnum } from '../../../shared/enums/base.enum';
import { ChatModel } from './chat.model';
import { ChatService } from './chat.service';
import { VendorRFQModel } from '../../vendor/shared';
import { RoleEnum } from '../../../shared/enums';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() rfqList: Array<VendorRFQModel> = [];
  @Input() isUser: boolean;
  @Input() isVendor: boolean;
  pageSize: Number = PaginationEnum.PageSize;
  vendorMessage: string = '';
  page: number = 0;
  totalRecords: Number = 0;
  chat: ChatModel = new ChatModel();
  profileUrl: string;
  chatHeader: any;
  constructor(
    private chatService: ChatService,
    public route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.chatHeader = this.route.snapshot.params['rfqNo'];
    this.profileUrl = localStorage.getItem('profileImage');
  }


  public saveMessage() {
    if (this.vendorMessage === '') {
      this.messageService.showMessage({ type: 'warning', title: 'Message', body: 'Message can not be blank' });
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.UserRoleIds[0] === RoleEnum.Vendor) {
      this.chat.isSentByVendor = true;
    } else if (user.UserRoleIds[0] === RoleEnum.PDU) {
      this.chat.isSentByVendor = false;
    }
    this.chat.rfqId = this.rfqList[0].rfqId;
    this.chat.vendorId = this.rfqList[0].vendorId;
    this.chat.rfqVendorId = this.rfqList[0].rfqVendorId;
    this.chat.message = this.vendorMessage;
    this.chatService.saveMessage(this.chat).subscribe((response) => {
      if (response) {
        this.rfqList.push(response);
        this.vendorMessage = '';
      }
    });
  }

  back() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.UserRoleIds[0] === RoleEnum.Vendor) {
      this.router.navigate(['vendor/rfq']);
    } else if (user.UserRoleIds[0] === RoleEnum.PDU) {
      this.router.navigate(['user/rfq']);
    }
  }

}
