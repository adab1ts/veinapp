import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { changeSearchFromAddress } from './state-management/actions/current-search-action';
import { SearchingStates } from './state-management/states/search-result-state';
import { warnSearchResult } from './state-management/actions/search-result-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  currentSearchData$;
  resultData;

  constructor(private store: Store<any>) {
    this.currentSearchData$ = this.store.select('CurrentSearchReducer');
    this.store.select('SearchResultReducer')
      .subscribe((status) =>
        this.resultData = SearchingStates[status['result']]
      );
  }

  search(input) {
    const address = input.value;
    if (!address) {
      return;
    }

    this.store
      .dispatch(warnSearchResult(SearchingStates.Waiting));
    this.store
      .dispatch(changeSearchFromAddress(address));

    input.value = '';
  }
}
