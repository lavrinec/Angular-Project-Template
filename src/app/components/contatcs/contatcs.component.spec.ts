import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatcsComponent } from '@src/app/contatcs/contatcs.component';

describe('ContatcsComponent', () => {
  let component: ContatcsComponent;
  let fixture: ComponentFixture<ContatcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
