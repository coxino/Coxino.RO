import { TestBed } from '@angular/core/testing';

import { LocalUserServiceService } from './local-user-service.service';

describe('LocalUserServiceService', () => {
  let service: LocalUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
