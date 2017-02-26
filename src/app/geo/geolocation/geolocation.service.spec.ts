/* tslint:disable:no-unused-variable */

import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Response, ResponseOptions } from '@angular/http';

import { WindowRefService } from '../windowRef/window-ref.service';
import { GeolocationService, GEOLOCATION_ERRORS } from './geolocation.service';

describe('GeolocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefService, GeolocationService, MockBackend]
    });
  });

  it('should return true if the service is deployed', inject([GeolocationService], (service: GeolocationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an Observable with an object with longitude and latitude',
    fakeAsync(inject([GeolocationService, MockBackend], (geolocationService, mockBackend) => {

      const mockResponse = {
        long: 4.432421,
        lat: 44.765565
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      geolocationService.getLocation().subscribe((searchState) => {
        expect(searchState.long).toEqual(4.432421);
        expect(searchState.lat).toEqual(44.765565);
      });
    })));

  it('should return an Observable with an error if permission is denied',
    fakeAsync(inject([GeolocationService, MockBackend], (geolocationService, mockBackend) => {

      const mockResponse = GEOLOCATION_ERRORS.permissionDenied;

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      geolocationService.getLocation().subscribe((searchState) => {
        expect(searchState).toEqual(GEOLOCATION_ERRORS.permissionDenied);
      });
    })));
});
