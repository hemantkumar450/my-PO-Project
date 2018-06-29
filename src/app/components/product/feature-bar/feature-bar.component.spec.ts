import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeatureBarComponent } from './feature-bar.component'

describe('ProductfeaturesComponent', () => {
  let component: ProductFeatureBarComponent;
  let fixture: ComponentFixture<ProductFeatureBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFeatureBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeatureBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
