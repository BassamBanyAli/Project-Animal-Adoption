import { TestBed } from '@angular/core/testing';

import { RawaahServicesService } from './rawaah-services.service';

describe('RawaahServicesService', () => {
  let service: RawaahServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawaahServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
