import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchingStates } from './state-management/states/search-result-state';
import { doGeoSearch, changeCurrentSearch } from './state-management/actions/current-search-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  currentCenter: any;
  resultData;

  constructor(private store: Store<any>) {
    this.store.select('currentSearch')
      .subscribe((data: any) => {
        this.currentCenter = data;
        this.store
          .dispatch(doGeoSearch({
            lat: data.lat,
            long: data.long
          }));
      });

    this.store.select('searchResult')
      .subscribe((status) =>
        this.resultData = SearchingStates[ status[ 'result' ] ]
      );
  }

  changeRadius(radius) {
    this.store.dispatch(changeCurrentSearch({radius: radius}));
  }

}
