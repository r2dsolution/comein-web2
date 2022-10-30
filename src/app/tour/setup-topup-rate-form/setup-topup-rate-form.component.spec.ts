import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTopupRateFormComponent } from './setup-topup-rate-form.component';

describe('SetupTopupRateFormComponent', () => {
  let component: SetupTopupRateFormComponent;
  let fixture: ComponentFixture<SetupTopupRateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTopupRateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTopupRateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
