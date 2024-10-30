import { TestBed } from '@angular/core/testing';

import { AyahURLService } from './ayah-url.service';

describe('AyahURLService', () => {
  let service: AyahURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AyahURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
