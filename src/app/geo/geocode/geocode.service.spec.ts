/* tslint:disable:no-unused-variable */

import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Response, ResponseOptions, Http} from '@angular/http';

import {GeocodeService} from './geocode.service';
import {MapzenGeocodeService} from './mapzen-geocode.service';

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
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  it('should return an Observable with an array with longitude and latitude',
    fakeAsync(inject([GeocodeService, MockBackend], (geocodeService, mockBackend) => {

      const mockResponse = {
        features: [{
          geometry: {
            coordinates: [4.432421, 44.765565]
          }
        }]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      geocodeService.getCoords('Mock Street').subscribe((coords) => {
        expect(coords.length).toBe(2);
        expect(coords[0]).toEqual(4.432421);
        expect(coords[1]).toEqual(44.765565);
      });
    })));
});