import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPaymentConditionAllComponent } from './setup-payment-condition-all.component';

describe('SetupPaymentConditionAllComponent', () => {
  let component: SetupPaymentConditionAllComponent;
  let fixture: ComponentFixture<SetupPaymentConditionAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupPaymentConditionAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPaymentConditionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
