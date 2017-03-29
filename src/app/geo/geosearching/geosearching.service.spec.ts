/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2';
import { MockBackend } from '@angular/http/testing';

import { GeosearchingService } from './geosearching.service';

class MockAngularFire {
}

describe('GeosearchingService', () => {
  let subject: GeosearchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeosearchingService,
        {
          provide: AngularFireDatabase, useClass: MockAngularFire, deps: [ MockBackend ]
        },
        MockBackend
      ]
    });
  });

  beforeEach(inject([ GeosearchingService ], (service: GeosearchingService) => {
    subject = service;
  }));

  xit('should load the Geosearching Service', () => {
    expect(subject).toBeDefined();
  });
});
