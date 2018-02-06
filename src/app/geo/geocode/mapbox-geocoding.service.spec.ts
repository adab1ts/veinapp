/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';

import { MapboxGeocodingService } from './mapbox-geocoding.service';

describe('MapboxGeocodingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MapboxGeocodingService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => new Http(mockBackend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  const search = { address: 'Mock Street 10, FakeCity', center: [41.429682, 2.175945] };
  const mockResponse = {
    forward: { features: [{ geometry: { coordinates: [2.175945, 41.429682] } }] },
    reverse: { features: [{ place_name: 'Mock Street 10, FakeCity' }] },
    empty: { features: [] }
  };

  it('getGeocoding should return an object with lat and long coordinates',
    (inject([MapboxGeocodingService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse.forward)
        })));
      });

      service.getGeocoding(search.address)
        .subscribe((result) => {
          expect(result.center).toEqual([41.429682, 2.175945]);
        });
    })));


  it('getGeocoding should return an object with no results when geocoding returns no valid result',
    (inject([MapboxGeocodingService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse.empty)
        })));
      });

      service.getGeocoding(search.address)
        .subscribe((result) => {
          expect(result).toBeFalsy();
          expect(result.center).toBeUndefined();
        });
    })));


  it('getReverseGeocoding should return an object with address attribute',
    (inject([MapboxGeocodingService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse.reverse)
        })));
      });

      service.getReverseGeocoding(search.center)
        .subscribe((result) => {
          expect(result.address).toEqual('Mock Street 10, FakeCity');
        });
    })));


  it('getReverseGeocoding should return an object with no results when reverse geocoding returns no valid result',
    (inject([MapboxGeocodingService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse.empty)
        })));
      });

      service.getReverseGeocoding(search.center)
        .subscribe((result) => {
          expect(result).toBeFalsy();
          expect(result.address).toBeUndefined();
        });
    })));
});
