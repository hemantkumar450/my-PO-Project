import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRfqsComponent } from './vendor-rfqs.component';

describe('VendorRfqsComponent', () => {
  let component: VendorRfqsComponent;
  let fixture: ComponentFixture<VendorRfqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorRfqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorRfqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
