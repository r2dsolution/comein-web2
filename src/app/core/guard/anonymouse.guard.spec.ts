import { TestBed } from '@angular/core/testing';

import { AnonymouseGuard } from './anonymouse.guard';

describe('AnonymouseGuard', () => {
  let guard: AnonymouseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnonymouseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
