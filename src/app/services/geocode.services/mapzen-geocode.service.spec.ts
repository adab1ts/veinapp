/* tslint:disable:no-unused-variable */

import {TestBed, inject, fakeAsync} from '@angular/core/testing';
import {HttpModule, Http, BaseRequestOptions, ResponseOptions, Response} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {MapzenGeocodeService} from './mapzen-geocode.service';
import {MAPZEN_BASE_URL} from './mapzen.config';

describe('MapzenGeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: MAPZEN_BASE_URL, useValue: 'http://veinapp.test.coop'},
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
    fakeAsync(inject([MapzenGeocodeService, MockBackend], (mapzenService, mockBackend) => {

      const mockResponse = {
        features: [{
          geometry: {
            coordinates: [2.175945, 41.429682]
          }
        }]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      mapzenService.getGeocoding('Mock Street').subscribe((coords) => {
        expect(coords.length).toBe(2);
        expect(coords[0]).toEqual(2.175945);
        expect(coords[1]).toEqual(41.429682);
      });
    })));

});
