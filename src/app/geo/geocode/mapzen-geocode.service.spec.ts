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

  it('should return an object with address, lat and long attributes',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      const address = 'Mock Street';
      const mockResponse = {
        features: [ {
          geometry: {
            coordinates: [ 2.175945, 41.429682 ]
          }
        } ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      mapzenService.getGeocoding(address)
        .subscribe((result) => {
          expect(result.address).toEqual(address);
          expect(result.long).toEqual(2.175945);
          expect(result.lat).toEqual(41.429682);
        });
    })));

  it('should return an object with no results when geocoding returns no valid result',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      const address = 'Mock Street';
      const mockResponse = {
        features: []
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      mapzenService.getGeocoding(address)
        .subscribe((result) => {
          expect(result.noResults).toBeTruthy();
          expect(result.address).toBeUndefined();
          expect(result.long).toBeUndefined();
          expect(result.lat).toBeUndefined();
        });
    })));


  it('should return a object with address attribute',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      const coords = {
        lat: 41.429682,
        long: 2.175945
      };
      const mockResponse = {
        features: [ {
          properties: {
            label: 'Mock St'
          }
        } ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      mapzenService.getReverseGeocoding(coords)
        .subscribe((result) => {
          expect(result.address).toEqual('Mock St');
        });
    })));

  it('should return an object with no results when reverse geocoding returns no valid result',
    (inject([ MapzenGeocodeService, MockBackend ], (mapzenService, mockBackend) => {

      const coords = {
        lat: 41.429682,
        long: 2.175945
      };
      const mockResponse = {
        features: []
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      mapzenService.getReverseGeocoding(coords)
        .subscribe((result) => {
          expect(result.noResults).toBeTruthy();
          expect(result.address).toBeUndefined();
        });
    })));
});
