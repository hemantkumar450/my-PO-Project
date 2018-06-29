import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerThreeComponent } from './container-three.component';

describe('ContainerThreeComponent', () => {
  let component: ContainerThreeComponent;
  let fixture: ComponentFixture<ContainerThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
