import { TestBed } from '@angular/core/testing';

import { LeenURLService } from './leen-url.service';

describe('LeenURLService', () => {
  let service: LeenURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeenURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
