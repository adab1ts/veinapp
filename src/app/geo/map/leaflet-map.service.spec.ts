/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeafletMapService } from './leaflet-map.service';

describe('LeafletMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeafletMapService]
    });
  });

  it('should ...', inject([LeafletMapService], (service: LeafletMapService) => {
    expect(service).toBeTruthy();
  }));
});
