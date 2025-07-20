import { TestBed } from '@angular/core/testing';

import { MsalInitService } from './msal-init.service';

describe('MsalInitService', () => {
  let service: MsalInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
