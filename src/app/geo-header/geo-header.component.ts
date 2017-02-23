import { Component, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { warnSearchResult } from '../state-management/actions/search-result-action';
import { SearchingStates } from '../state-management/states/search-result-state';
import { changeSearchFromAddress } from '../state-management/actions/current-search-action';
import { GeolocationService, GeocodeService } from '../geo/geo.module';

@Component({
  selector: 'app-geo-header',
  templateUrl: './geo-header.component.html',
  styleUrls: [ './geo-header.component.scss' ]
})
export class GeoHeaderComponent {
  @Output() geoAddress = '';
  @Output() inputActive = true;
  @Output() doFocus = false;

  constructor(private store: Store<any>,
              private geolocationService: GeolocationService,
              private geocodeService: GeocodeService) {

  }
  // TODO prevent from doing the search if text has not changed
  search($value) {
    this.store
      .dispatch(warnSearchResult(SearchingStates.Waiting));
    this.store
      .dispatch(changeSearchFromAddress($value));
  }

  geolocate() {
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
