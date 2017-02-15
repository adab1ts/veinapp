/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {MapzenGeocodeService, MAPZEN_BASE_URL} from './mapzen-geocode.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpModule, Http, BaseRequestOptions, ResponseOptions, Response} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('MapzenGeocodeService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: MAPZEN_BASE_URL, useValue: 'https://search.mapzen.com/v1/search'},
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
    inject([MapzenGeocodeService, MockBackend], (mapzenService, mockBackend) => {

      const mockResponse = {
        features: [{geometry: {coordinates: [2.175945, 41.429682]}}]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      mapzenService.getGeocoding().subscribe((coords) => {
        expect(coords.length).toBe(2);
        expect(coords[0]).toEqual(2.175945);
        expect(coords[1]).toEqual(41.429682);
      });
    }));

});
