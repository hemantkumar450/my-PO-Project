import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() contents: Array<any> = [];
  constructor(protected router: Router,) { }

  ngOnInit() {
    
  }

  onContentSelect(item) {
    this.router.navigate(['product/individual/' + item.id]);
  }

}
