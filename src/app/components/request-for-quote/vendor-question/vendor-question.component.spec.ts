import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorQuestionComponent } from './vendor-question.component';

describe('VendorQuestionComponent', () => {
  let component: VendorQuestionComponent;
  let fixture: ComponentFixture<VendorQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
