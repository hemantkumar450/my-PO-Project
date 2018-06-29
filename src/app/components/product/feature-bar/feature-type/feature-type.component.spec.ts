import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeatureTypeComponent } from './feature-type.component';

describe('FeaturetypeComponent', () => {
  let component: ProductFeatureTypeComponent;
  let fixture: ComponentFixture<ProductFeatureTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFeatureTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeatureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
