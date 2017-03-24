import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2';
import { MockBackend } from '@angular/http/testing';

import { FirebaseQueryingService } from './firebase-querying.service';

class MockAngularFire {}

describe('FirebaseQueryingService', () => {
  let subject: FirebaseQueryingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirebaseQueryingService,
        {
          provide: AngularFireDatabase, useClass: MockAngularFire, deps: [ MockBackend ]
        },
        MockBackend
      ]
    });
  });

  beforeEach(inject([ FirebaseQueryingService ], (service: FirebaseQueryingService) => {
    subject = service;
  }));

  it('should load the FirebaseQueryingService', () => {
    expect(subject).toBeDefined();
  });

});
