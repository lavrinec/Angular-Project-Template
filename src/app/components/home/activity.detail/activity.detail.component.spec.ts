import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity.DetailComponent } from '@src/app/home/activity.detail/activity.detail.component';

describe('Activity.DetailComponent', () => {
  let component: Activity.DetailComponent;
  let fixture: ComponentFixture<Activity.DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Activity.DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Activity.DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
