import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../shared/loader/loader.service';
import { MessageService } from '../../shared/message/messageService.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  constructor(
    private loaderService: LoaderService,
    private messageService: MessageService,) { 

  }

  ngOnInit() {

  }
 
}
