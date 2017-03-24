/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

import { GeosearchingService } from './geosearching.service';

describe('GeosearchingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeosearchingService]
    });
  });

  xit('should ...', inject([GeosearchingService], (service: GeosearchingService) => {
    expect(service).toBeTruthy();
  }));
});
