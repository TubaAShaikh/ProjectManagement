import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectTaskComponent } from './manage-project-task.component';

describe('ManageProjectTaskComponent', () => {
  let component: ManageProjectTaskComponent;
  let fixture: ComponentFixture<ManageProjectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProjectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
