import { TestBed } from '@angular/core/testing';

import { HotelStaffService } from './hotel-staff.service';

describe('HotelStaffService', () => {
  let service: HotelStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
