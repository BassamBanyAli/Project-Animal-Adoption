import { TestBed } from '@angular/core/testing';

import { DuhaUrlService } from './duha-url.service';

describe('DuhaUrlService', () => {
  let service: DuhaUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuhaUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
