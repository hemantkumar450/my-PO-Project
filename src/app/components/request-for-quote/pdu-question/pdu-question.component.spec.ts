import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PduQuestionComponent } from './pdu-question.component';

describe('PduQuestionComponent', () => {
  let component: PduQuestionComponent;
  let fixture: ComponentFixture<PduQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PduQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PduQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
