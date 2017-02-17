import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrentSearchState } from './state-management/states/current-search-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  currentSearchData$;

  constructor(private store: Store<CurrentSearchState>) {
    this.currentSearchData$ = this.store.select('CurrentSearchReducer');
  }

  ngOnInit() {
    this.store.dispatch({
      type: 'CHANGE_SEARCH_FROM_ADDRESS',
      payload: {address: 'Carrer de la Jota 66, Barcelona'}
    });
  }

}
