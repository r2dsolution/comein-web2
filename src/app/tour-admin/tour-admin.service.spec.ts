import { TestBed } from '@angular/core/testing';

import { TourAdminService } from './tour-admin.service';

describe('TourAdminService', () => {
  let service: TourAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
