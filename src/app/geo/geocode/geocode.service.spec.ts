/* tslint:disable:no-unused-variable */
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';

import { GeocodeService } from './geocode.service';
import { MapzenGeocodeService } from './mapzen-geocode.service';

describe('GeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeocodeService,
        MapzenGeocodeService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  it('should return an object with address, lat and long attributes',
    fakeAsync(inject([ GeocodeService, MockBackend ], (geocodeService, mockBackend) => {

      const address = 'Mock St';
      const mockResponse = {
        features: [ {
          geometry: {
            coordinates: [ 4.432421, 44.765565 ]
          }
        } ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      geocodeService.getCoords(address).subscribe((searchState) => {
        expect(searchState.address).toEqual(address);
        expect(searchState.center[1]).toEqual(4.432421);
        expect(searchState.center[0]).toEqual(44.765565);
      });
    })));

  it('should return a object with address attribute',
    fakeAsync(inject([ GeocodeService, MockBackend ], (geocodeService, mockBackend) => {

      const coords = [41.429682, 2.175945];
      const mockResponse = {
        features: [ {
          properties: {
            label: 'Mock Street'
          }
        } ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      geocodeService.getAddress(coords).subscribe((searchState) => {
        expect(searchState.address).toEqual('Mock Street');
      });
    })));
});
