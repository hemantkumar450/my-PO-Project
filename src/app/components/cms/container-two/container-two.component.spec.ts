import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTwoComponent } from './container-two.component';

describe('ContainerTwoComponent', () => {
  let component: ContainerTwoComponent;
  let fixture: ComponentFixture<ContainerTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
