import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchingStates } from './state-management/states/search-result-state';
import { GeolocationService } from './geo/geolocation/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'app works!';
  currentSearchData$;
  resultData;
  coords: any = 'retrieving data...';
  error = 'No error';

  constructor(private store: Store<any>, private geolocation: GeolocationService) {
    this.currentSearchData$ = this.store.select('CurrentSearchReducer');
    this.store.select('SearchResultReducer')
      .subscribe((status) =>
        this.resultData = SearchingStates[ status[ 'result' ] ]
      );

    this.coords = this.geolocation.getLocation()
      .subscribe(
        (coords) => this.coords = coords,
        (err) => this.error = err
      );
  }

}
