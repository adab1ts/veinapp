import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  changeSearchFromAddress, changeSearchByRadius
} from '../state-management/actions/current-search-action';
import { GeolocationService, GeocodeService } from '../geo/geo.module';

@Component({
  selector: 'app-geo-header',
  templateUrl: './geo-header.component.html',
  styleUrls: [ './geo-header.component.scss' ]
})
export class GeoHeaderComponent {
  geoAddress = '';
  doFocus = false;
  currentRadius = 0;
  searchPending = false;
  geolocationPending = false;

  constructor(private store: Store<any>,
              private geolocationService: GeolocationService,
              private geocodeService: GeocodeService) {

    this.store.select('currentSearch')
      .subscribe((data: any) => {
        this.searchPending = data.pending;
        this.currentRadius = data.radius;
      });
  }

  // TODO prevent from doing the search if text has not changed
  search($value) {
    this.store
      .dispatch(changeSearchFromAddress({ address: $value }));
  }

  changeRadius(radius) {
    this.store.dispatch(changeSearchByRadius({ radius: radius }));
  }

  geolocate() {
    this.geoAddress = '';
    this.doFocus = false;
    this.geolocationPending = true;

    this.geolocationService.getLocation()
      .flatMap(
        (coords) => this.geocodeService.getAddress(coords)
      )
      .subscribe(
        (data) => {
          this.geoAddress = data.address;
          this.doFocus = true;
          this.geolocationPending = false;
        },
        (err) => {
          this.geolocationPending = false;
          console.error(err);
        }
      );
  }

}
