import { TestBed } from '@angular/core/testing';

import { UrlBassamService } from './url-bassam.service';

describe('UrlBassamService', () => {
  let service: UrlBassamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlBassamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
