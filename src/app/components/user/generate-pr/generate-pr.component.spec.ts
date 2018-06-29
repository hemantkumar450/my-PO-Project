import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePrComponent } from './generate-pr.component';

describe('GeneratePrComponent', () => {
  let component: GeneratePrComponent;
  let fixture: ComponentFixture<GeneratePrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
