import { TestBed } from '@angular/core/testing';

import { HotelAdminService } from './hotel-admin.service';

describe('HotelAdminService', () => {
  let service: HotelAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
