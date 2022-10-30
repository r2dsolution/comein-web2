import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPaymentConditionComponent } from './setup-payment-condition.component';

describe('SetupPaymentConditionComponent', () => {
  let component: SetupPaymentConditionComponent;
  let fixture: ComponentFixture<SetupPaymentConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupPaymentConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPaymentConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
