import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTopupRateSelectComponent } from './setup-topup-rate-select.component';

describe('SetupTopupRateSelectComponent', () => {
  let component: SetupTopupRateSelectComponent;
  let fixture: ComponentFixture<SetupTopupRateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTopupRateSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTopupRateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
