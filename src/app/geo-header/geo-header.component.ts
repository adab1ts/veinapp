import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { warnSearchResult } from '../state-management/actions/search-result-action';
import { SearchingStates } from '../state-management/states/search-result-state';
import { changeSearchFromAddress, changeCurrentSearch } from '../state-management/actions/current-search-action';
import { GeolocationService, GeocodeService } from '../geo/geo.module';

@Component({
  selector: 'app-geo-header',
  templateUrl: './geo-header.component.html',
  styleUrls: [ './geo-header.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoHeaderComponent {
  geoAddress = '';
  doFocus = false;
  currentRadius = 0;

  constructor(private store: Store<any>,
              private geolocationService: GeolocationService,
              private geocodeService: GeocodeService) {

    this.store.select('currentSearch')
      .subscribe((data: any) => this.currentRadius = data.radius);
  }

  // TODO prevent from doing the search if text has not changed
  search($value) {
    this.store
      .dispatch(warnSearchResult(SearchingStates.Waiting));
    this.store
      .dispatch(changeSearchFromAddress({ address: $value }));
  }

  changeRadius(radius) {
    this.store.dispatch(changeCurrentSearch({ radius: radius }));
  }

  geolocate() {
    this.geoAddress = '';
    this.doFocus = false;
    this.store
      .dispatch(warnSearchResult(SearchingStates.Waiting));

    this.geolocationService.getLocation()
      .flatMap(
        (coords) => this.geocodeService.getAddress(coords)
      )
      .subscribe(
        (data) => {
          this.geoAddress = data.address;
          this.doFocus = true;
          this.store
            .dispatch(warnSearchResult(SearchingStates.HasResults));
        },
        (err) => console.error(err)
      );
  }

}
