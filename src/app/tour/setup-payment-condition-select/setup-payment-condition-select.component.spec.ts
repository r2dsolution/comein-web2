import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPaymentConditionSelectComponent } from './setup-payment-condition-select.component';

describe('SetupPaymentConditionSelectComponent', () => {
  let component: SetupPaymentConditionSelectComponent;
  let fixture: ComponentFixture<SetupPaymentConditionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupPaymentConditionSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPaymentConditionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
