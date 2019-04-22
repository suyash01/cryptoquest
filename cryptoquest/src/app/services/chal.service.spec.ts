import { TestBed } from '@angular/core/testing';

import { ChalService } from './chal.service';

describe('ChalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChalService = TestBed.get(ChalService);
    expect(service).toBeTruthy();
  });
});
