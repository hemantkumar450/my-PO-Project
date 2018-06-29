import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-related-list',
  templateUrl: './related-list.component.html',
  styleUrls: ['./related-list.component.css']
})

export class ProductRelatedListComponent implements OnInit {
  @Input() relatedList: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
