import { TestBed } from '@angular/core/testing';

import { NgUniversalService } from './ng-universal.service';

describe('NgUniversalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgUniversalService = TestBed.get(NgUniversalService);
    expect(service).toBeTruthy();
  });
});
