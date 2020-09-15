import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Contacs.Detail.EditComponent } from '@src/app/components/contacts/contacs.detail.edit/contacs.detail.edit.component';

describe('Contacs.Detail.EditComponent', () => {
  let component: Contacs.Detail.EditComponent;
  let fixture: ComponentFixture<Contacs.Detail.EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Contacs.Detail.EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Contacs.Detail.EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
