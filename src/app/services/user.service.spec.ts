import { TestBed } from '@angular/core/testing';

import { UserIdService } from './userId.service';

describe('UserService', () => {
  let service: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
