import { TestBed } from '@angular/core/testing';

import { PayableCompanyService } from './payable-company.service';

describe('PayableCompanyService', () => {
  let service: PayableCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayableCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
