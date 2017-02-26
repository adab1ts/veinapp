/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { MapzenGeocodeService } from './mapzen-geocode.service';
import { MAPZEN_SEARCH_URL } from '../../../config/mapzen.config';

describe('MapzenGeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        { provide: MAPZEN_SEARCH_URL, useValue: 'http://veinapp.test.coop' },
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
  const geoData = {
    address: 'Mock Street', lat: 41.429682, long: 2.175945
  };
  const mockReverseGeocodingResponse = {
    features: [ { properties: { label: 'Mock Street' } } ]
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
          expect(result.address).toEqual('Mock Street');
          expect(result.long).toEqual(2.175945);
          expect(result.lat).toEqual(41.429682);
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
          expect(result.address).toBeUndefined();
          expect(result.long).toBeUndefined();
          expect(result.lat).toBeUndefined();
        });
    })));


  it('should return a object with address attribute',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockReverseGeocodingResponse)
        })));
      });

      mapzenService.getReverseGeocoding(geoData)
        .subscribe((result) => {
          expect(result.address).toEqual('Mock Street');
        });
    })));

  it('should return an object with no results when reverse geocoding returns no valid result',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockEmptyResponse)
        })));
      });

      mapzenService.getReverseGeocoding(geoData)
        .subscribe((result) => {
          expect(result).toBeFalsy();
          expect(result.address).toBeUndefined();
        });
    })));
});
