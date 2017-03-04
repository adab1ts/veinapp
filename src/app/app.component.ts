import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TdMediaService } from '@covalent/core';

import { SearchingStates } from './state-management/states/search-result-state';
import { doGeoSearch, changeCurrentSearch } from './state-management/actions/current-search-action';
import { CurrentSearchState } from './state-management/states/current-search-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements AfterViewInit {
  currentCenter: any;
  resultData;

  constructor(private store: Store<CurrentSearchState>,
              public media: TdMediaService) {
    this.store.select('currentSearch')
      .subscribe((data: any) => {
        this.currentCenter = data;
        this.store
          .dispatch(doGeoSearch({
            radius: data.radius,
            lat: data.lat,
            long: data.long
          }));
      });

    this.store.select('searchResult')
      .subscribe((status) =>
        this.resultData = SearchingStates[ status[ 'result' ] ]
      );
  }

  ngAfterViewInit() {
    this.media.broadcast();
  }
}
