import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTopupRateComponent } from './setup-topup-rate.component';

describe('SetupTopupRateComponent', () => {
  let component: SetupTopupRateComponent;
  let fixture: ComponentFixture<SetupTopupRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTopupRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTopupRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
