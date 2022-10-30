import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTopupRateAllComponent } from './setup-topup-rate-all.component';

describe('SetupTopupRateAllComponent', () => {
  let component: SetupTopupRateAllComponent;
  let fixture: ComponentFixture<SetupTopupRateAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTopupRateAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTopupRateAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
