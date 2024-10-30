import { TestBed } from '@angular/core/testing';

import { AyahURLadminService } from './ayah-urladmin.service';

describe('AyahURLadminService', () => {
  let service: AyahURLadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AyahURLadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
