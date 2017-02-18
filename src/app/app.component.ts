import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { RESET_SEARCH_RESULT_STATE } from './state-management/actions/search-result-action';
import { CHANGE_SEARCH_FROM_ADDRESS } from './state-management/actions/current-search-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  currentSearchData$;
  resultData$;

  constructor(private store: Store<any>) {
    this.currentSearchData$ = this.store.select('CurrentSearchReducer');
    this.resultData$ = this.store.select('SearchResultReducer');
  }

  ngOnInit() {

  }

  search(input) {
    if (!input.value) {
      return;
    }

    this.store.dispatch({
      type: RESET_SEARCH_RESULT_STATE,
      payload: {noResults: false}
    });
    this.store.dispatch({
      type: CHANGE_SEARCH_FROM_ADDRESS,
      payload: {address: input.value}
    });

    input.value = '';
  }

}
