import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteVendorComponent } from './invite-vendor.component';

describe('InviteVendorComponent', () => {
  let component: InviteVendorComponent;
  let fixture: ComponentFixture<InviteVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
