import { TestBed, inject } from '@angular/core/testing';

import { FirebaseQueryingService } from './firebase-querying.service';

describe('FirebaseQueryingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseQueryingService]
    });
  });

  xit('should ...', inject([FirebaseQueryingService], (service: FirebaseQueryingService) => {
    expect(service).toBeTruthy();
  }));
});
