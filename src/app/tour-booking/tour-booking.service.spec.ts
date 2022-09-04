import { TestBed } from '@angular/core/testing';

import { TourBookingService } from './tour-booking.service';

describe('TourBookingService', () => {
  let service: TourBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
