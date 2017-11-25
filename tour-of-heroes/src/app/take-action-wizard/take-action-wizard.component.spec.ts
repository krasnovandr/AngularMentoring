import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeActionWizardComponent } from './take-action-wizard.component';

describe('TakeActionWizardComponent', () => {
  let component: TakeActionWizardComponent;
  let fixture: ComponentFixture<TakeActionWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeActionWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeActionWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
