import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity.Detail.EditComponent } from '@src/app/components/home/activity.detail.edit/activity.detail.edit.component';

describe('Activity.Detail.EditComponent', () => {
  let component: Activity.Detail.EditComponent;
  let fixture: ComponentFixture<Activity.Detail.EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Activity.Detail.EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Activity.Detail.EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
