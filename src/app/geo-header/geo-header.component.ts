import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { warnSearchResult } from '../state-management/actions/search-result-action';
import { SearchingStates } from '../state-management/states/search-result-state';
import { changeSearchFromAddress } from '../state-management/actions/current-search-action';

@Component({
  selector: 'app-geo-header',
  templateUrl: './geo-header.component.html',
  styleUrls: ['./geo-header.component.scss']
})
export class GeoHeaderComponent {

  constructor(private store: Store<any>) {}
  // TODO prevent from doing the search if text has not changed
  search($value) {
    this.store
      .dispatch(warnSearchResult(SearchingStates.Waiting));
    this.store
      .dispatch(changeSearchFromAddress($value));
  }

}
