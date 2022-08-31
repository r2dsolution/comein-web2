import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBookingConsentComponent } from './pre-booking-consent.component';

describe('PreBookingConsentComponent', () => {
  let component: PreBookingConsentComponent;
  let fixture: ComponentFixture<PreBookingConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreBookingConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBookingConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
