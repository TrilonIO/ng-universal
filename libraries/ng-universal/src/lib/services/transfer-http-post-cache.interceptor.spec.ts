import { TestBed } from '@angular/core/testing';

import { TransferHttpPostCacheInterceptor } from './transfer-http-post-cache-interceptor';

describe('TransferHttpPostCacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferHttpPostCacheInterceptor = TestBed.get(TransferHttpPostCacheInterceptor);
    expect(service).toBeTruthy();
  });
});
