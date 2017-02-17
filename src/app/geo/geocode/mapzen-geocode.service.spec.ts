/* tslint:disable:no-unused-variable */

import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MapzenGeocodeService } from './mapzen-geocode.service';
import { MAPZEN_BASE_URL } from '../../../config/mapzen.config';

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

  it('should return a CurrentSearchState object with address, lat and long attributes',
    (inject([MapzenGeocodeService, MockBackend], (mapzenService, mockBackend) => {

      const address = 'Mock Street';
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

      mapzenService.getGeocoding(address)
        .subscribe((result) => {
          expect(result.address).toEqual(address);
          expect(result.lat).toEqual(2.175945);
          expect(result.long).toEqual(41.429682);
        });
    })));

});
