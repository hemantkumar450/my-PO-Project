import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIndividualComponent } from './individual.component';

describe('ProductViewComponent', () => {
  let component: ProductIndividualComponent;
  let fixture: ComponentFixture<ProductIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductIndividualComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
