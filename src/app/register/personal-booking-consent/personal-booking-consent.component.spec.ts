import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBookingConsentComponent } from './personal-booking-consent.component';

describe('PersonalBookingConsentComponent', () => {
  let component: PersonalBookingConsentComponent;
  let fixture: ComponentFixture<PersonalBookingConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalBookingConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalBookingConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
