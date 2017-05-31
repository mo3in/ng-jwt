import { TestBed, inject } from '@angular/core/testing';

import { AuthHttp } from './auth-http.service';

describe('AuthHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHttp]
    });
  });

  it('should be created', inject([AuthHttp], (service: AuthHttp) => {
    expect(service).toBeTruthy();
  }));
});
