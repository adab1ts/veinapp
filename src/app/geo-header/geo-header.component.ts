import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../state-management/reducers';
import * as search from '../state-management/actions/current-search-action';
import { GeolocationService, GeocodeService } from '../geo/geo.module';

@Component({
  selector: 'app-geo-header',
  templateUrl: './geo-header.component.html'
})
export class GeoHeaderComponent implements OnInit {
  geoAddress = '';
  doFocus = false;
  currentRadius$;

  centerDistances = [ 0.5, 1, 2, 3, 5 ];
  @Output() geolocationPending = new EventEmitter<boolean>();

  constructor(private store: Store<fromRoot.State>,
              private geolocationService: GeolocationService,
              private geocodeService: GeocodeService) {
  }

  ngOnInit() {
    this.currentRadius$ = this.store.select(fromRoot.radius);
  }

  // TODO prevent from doing the search if text has not changed
  search($value) {
    this.store
      .dispatch(new search.ChangeSearchFromAddress({ address: $value }));
  }

  changeRadius(radius) {
    this.store
      .dispatch(new search.ChangeSearchByRadius({ radius: radius }));
  }

  // TODO create a state to control the geolocation state
  // the result or not provided, and the geolocationPending response
  geolocate() {
    this.geoAddress = '';
    this.doFocus = false;
    this.geolocationPending.emit(true);

    this.geolocationService.getLocation()
      .switchMap(
        (coords) => this.geocodeService.getAddress(coords)
      )
      .subscribe(
        (data) => {
          this.geoAddress = data.address;
          this.doFocus = true;
          this.geolocationPending.emit(false);
        },
        (err) => {
          this.geolocationPending.emit(false);
          console.error(err);
        }
      );
  }

}
