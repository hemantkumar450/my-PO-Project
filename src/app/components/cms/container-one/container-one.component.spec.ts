import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerOneComponent } from './container-one.component';

describe('ContainerOneComponent', () => {
  let component: ContainerOneComponent;
  let fixture: ComponentFixture<ContainerOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
