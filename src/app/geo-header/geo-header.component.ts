import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import {
  changeSearchFromAddress,
  changeSearchByRadius,
  doGeoSearch
} from '../state-management/actions/current-search-action';
import { GeolocationService, GeocodeService } from '../geo/geo.module';

@Component({
  selector: 'app-geo-header',
  templateUrl: './geo-header.component.html',
  styleUrls: [ './geo-header.component.scss' ]
})
export class GeoHeaderComponent implements OnInit {
  geoAddress = '';
  doFocus = false;
  currentRadius;
  centerDistances = [0.5, 1, 2, 3];
  @Output() geolocationPending = new EventEmitter<boolean>();
  subscription = new Subscription();

  constructor(private store: Store<any>,
              private geolocationService: GeolocationService,
              private geocodeService: GeocodeService) {
  }

  ngOnInit() {
    // Initial search with default center
    this.subscription = this.store.select('currentSearch')
      .take(1)
      .subscribe((data: any) => {
        this.store
          .dispatch(doGeoSearch({
            radius: data.radius,
            center: data.center
          }));
        this.subscription.unsubscribe();
      });

    this.store.select('currentSearch')
      .subscribe((data: any) => {
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

  // TODO create a state to control the geolocation state
  // the result or not provided, and the geolocationPending response
  geolocate() {
    this.geoAddress = '';
    this.doFocus = false;
    this.geolocationPending.emit(true);

    this.geolocationService.getLocation()
      .flatMap(
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
