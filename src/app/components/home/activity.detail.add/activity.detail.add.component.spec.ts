import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Activity.Detail.AddComponent } from '@src/app/components/home/activity.detail.add/activity.detail.add.component';

describe('Activity.Detail.AddComponent', () => {
  let component: Activity.Detail.AddComponent;
  let fixture: ComponentFixture<Activity.Detail.AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Activity.Detail.AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Activity.Detail.AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
