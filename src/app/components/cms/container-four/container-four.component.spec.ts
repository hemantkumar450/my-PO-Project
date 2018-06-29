import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFourComponent } from './container-four.component';

describe('ContainerFourComponent', () => {
  let component: ContainerFourComponent;
  let fixture: ComponentFixture<ContainerFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
