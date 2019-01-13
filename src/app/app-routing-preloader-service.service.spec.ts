import { TestBed, inject } from '@angular/core/testing';

import { AppRoutingPreloaderService } from './app-routing-preloader-service.service';

describe('AppRoutingPreloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppRoutingPreloaderService]
    });
  });

  it('should be created', inject([AppRoutingPreloaderService], (service: AppRoutingPreloaderService) => {
    expect(service).toBeTruthy();
  }));
});
