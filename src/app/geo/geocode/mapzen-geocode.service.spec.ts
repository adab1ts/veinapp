/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { MapzenGeocodeService } from './mapzen-geocode.service';

describe('MapzenGeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
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

  // mocked data

  const centerData = [ 41.429682, 2.175945 ];
  const geoData = {
    address: 'Mock Street, 10, FakeCity', center: centerData
  };
  const mockReverseGeocodingResponse = {
    features: [ { properties: { street: 'Mock Street', housenumber: '10', localadmin: 'FakeCity', label: 'Mock Street, 10, FakeCity' } } ]
  };
  const mockGeocodingResponse = {
    features: [ { geometry: { coordinates: [ 2.175945, 41.429682 ] } } ]
  };
  const mockEmptyResponse = { features: [] };


  it('should return an object with address, lat and long attributes',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockGeocodingResponse)
        })));
      });

      mapzenService.getGeocoding(geoData.address)
        .subscribe((result) => {
          expect(result.address).toEqual('Mock Street, 10, FakeCity');
          expect(result.center[ 1 ]).toEqual(2.175945);
          expect(result.center[ 0 ]).toEqual(41.429682);
        });
    })));

  it('should return an object with no results when geocoding returns no valid result',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockEmptyResponse)
        })));
      });

      mapzenService.getGeocoding(geoData.address)
        .subscribe((result) => {
          expect(result).toBeFalsy();
        });
    })));


  it('should return a object with address attribute',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockReverseGeocodingResponse)
        })));
      });

      mapzenService.getReverseGeocoding(centerData)
        .subscribe((result) => {
          expect(result.address).toEqual('Mock Street, 10, FakeCity');
        });
    })));

  it('should return an object with no results when reverse geocoding returns no valid result',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockEmptyResponse)
        })));
      });

      mapzenService.getReverseGeocoding(centerData)
        .subscribe((result) => {
          expect(result).toBeFalsy();
          expect(result.address).toBeUndefined();
        });
    })));
});
