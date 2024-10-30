import { TestBed } from '@angular/core/testing';

import { ContactURLService } from './contact-url.service';

describe('ContactURLService', () => {
  let service: ContactURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
