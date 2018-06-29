import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRelatedListComponent } from './related-list.component';

describe('RelatedProductsComponent', () => {
  let component: ProductRelatedListComponent;
  let fixture: ComponentFixture<ProductRelatedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRelatedListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRelatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
