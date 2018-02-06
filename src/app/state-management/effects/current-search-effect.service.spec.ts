/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import { StoreModule } from '@ngrx/store';
import { AngularFireDatabase } from 'angularfire2';

import { CurrentSearchEffectService } from './current-search-effect.service';
import { WindowRefService } from '../../geo/windowRef/window-ref.service';
import { GeolocationService, GeocodeService, GeosearchingService, FirebaseQueryingService } from '../../geo/geo.module';
import { ActionTypes } from '../actions/current-search-action';
import { MapboxGeocodingService } from '../../geo/geocode/mapbox-geocoding.service';
import { regExpEscape } from '../../util';

describe('CurrentSearch Effect Service', () => {
  let runner: EffectsRunner;
  let currentSearchEffects: CurrentSearchEffectService;
  let geocodeService: GeocodeService;
  let geosearchingService: GeosearchingService;
  let firebaseQueryingService: FirebaseQueryingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ EffectsTestingModule, StoreModule.provideStore({}) ],
      providers: [
        CurrentSearchEffectService,
        WindowRefService,
        GeolocationService,
        GeocodeService,
        FirebaseQueryingService,
        { provide: GeosearchingService, useValue: { getPlaces: null } },
        { provide: MapboxGeocodingService, useValue: null },
        { provide: AngularFireDatabase, useValue: null }
      ]
    });
  });

  beforeEach(inject([
      EffectsRunner,
      CurrentSearchEffectService,
      GeocodeService,
      GeosearchingService,
      FirebaseQueryingService
    ],
    (_runner,
     _currentSearchEffects,
     _geocodeService,
     _geosearchingService,
     _firebaseQueryingService) => {
      runner = _runner;
      currentSearchEffects = _currentSearchEffects;
      geocodeService = _geocodeService;
      geosearchingService = _geosearchingService;
      firebaseQueryingService = _firebaseQueryingService;
    }
  ));

  it('should return nothing if no result founded for the given address', () => {
    spyOn(geocodeService, 'getCoords')
      .and.returnValue(Observable.of(false));

    runner.queue({
      type: ActionTypes.CHANGE_SEARCH_FROM_ADDRESS,
      payload: { address: `Street Mocked 333, Barcelona` }
    });
    currentSearchEffects.changeCurrentSearchFromGeocode$
      .subscribe(result => {
        expect(result[ 'type' ]).toEqual(ActionTypes.NO_RESULTS_SEARCH);
      });
  });

  it('should return a new search params and a new geosearch given an address', () => {
    const data = {
      address: `Street Mocked 333, Barcelona`,
      center: [ 42.523242, 2.00042 ],
    };
    spyOn(geocodeService, 'getCoords')
      .and.returnValue(Observable.of(data));

    runner.queue({
      type: ActionTypes.CHANGE_SEARCH_FROM_ADDRESS,
      payload: { address: `Street Mocked 333, Barcelona` }
    });
    currentSearchEffects.changeCurrentSearchFromGeocode$
      .subscribe(result => {
        const regex = new RegExp(regExpEscape(ActionTypes.CHANGE_CURRENT_PARAMS) + '|' + regExpEscape(ActionTypes.DO_GEO_SEARCH), 'g');
        expect(result[ 'payload' ]).toEqual(data);
        expect(result[ 'type' ]).toMatch(regex);
      });
  });

  it('should return a new search params and a new geosearch given a radius', () => {
    const data = { radius: 2 };

    runner.queue({ type: ActionTypes.CHANGE_SEARCH_BY_RADIUS, payload: { radius: 2 } });
    currentSearchEffects.changeCurrentSearchByRadius$
      .subscribe(result => {
        const regex = new RegExp(regExpEscape(ActionTypes.CHANGE_CURRENT_PARAMS) + '|' + regExpEscape(ActionTypes.DO_GEO_SEARCH), 'g');
        expect(result[ 'payload' ]).toEqual(data);
        expect(result[ 'type' ]).toMatch(regex);
      });
  });

  it('should return a new search places result given a new address', () => {
    const places = [
      { $key: '-KfVdrj7PzN3qN-tKY6m', remove: true },
      { $key: '-KfVdriZoQXLDxFWaeqP', distance: 0.3330405392365475, location: [ 41.35333, 2.100321 ] },
      { $key: '-KfVdriSmFvgey1pz1Mj', distance: 0.906456333534633, location: [ 41.37333, 2.53262 ] },
      { $key: '-KfVdridMr2TGAfOSyng', remove: true }
    ];

    spyOn(geosearchingService, 'getPlaces')
      .and.returnValue(Observable.of(places));
    spyOn(firebaseQueryingService, 'getData')
      .and.returnValue(Observable.of(places));

    runner.queue({
      type: ActionTypes.DO_GEO_SEARCH, payload: {
        address: `Street Mocked 333, Barcelona`,
        center: [ 42.523242, 2.00042 ],
      }
    });
    currentSearchEffects.updateGeoSearch$
      .subscribe(result => {
        expect(result[ 'payload' ]).toEqual(places);
        expect(result[ 'type' ]).toEqual(ActionTypes.UPDATE_GEOSEARCH_RESULTS);
      });
  });

  it('should return a new search places result given a new radius', () => {
    const places = [
      { $key: '-KfVdrj7PzN3qN-tKY6m', remove: true },
      { $key: '-KfVdriZoQXLDxFWaeqP', remove: true },
      { $key: '-KfVdridMr2TGAfOSyng', remove: true }
    ];

    spyOn(geosearchingService, 'getPlaces')
      .and.returnValue(Observable.of(places));
    spyOn(firebaseQueryingService, 'getData')
      .and.returnValue(Observable.of(places));

    runner.queue({
      type: ActionTypes.DO_GEO_SEARCH, payload: { radius: 0.5 }
    });
    currentSearchEffects.updateGeoSearch$
      .subscribe(result => {
        expect(result[ 'payload' ]).toEqual(places);
        expect(result[ 'type' ]).toEqual(ActionTypes.UPDATE_GEOSEARCH_RESULTS);
      });
  });

  it('should return nothing if no search places result given a new radius or address', () => {
    const places = [];

    spyOn(geosearchingService, 'getPlaces')
      .and.returnValue(Observable.of(places));
    spyOn(firebaseQueryingService, 'getData')
      .and.returnValue(Observable.of(places));

    runner.queue({
      type: ActionTypes.DO_GEO_SEARCH, payload: { radius: 0.5 }
    });
    currentSearchEffects.updateGeoSearch$
      .subscribe(result => {
        expect(result[ 'type' ]).toEqual(ActionTypes.NO_RESULTS_SEARCH);
      });
  });
});
