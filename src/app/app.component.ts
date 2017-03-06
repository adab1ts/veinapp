import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CurrentSearchState } from './state-management/states/current-search-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  searchPending = false;
  geolocationPending = false;

  constructor(private store: Store<CurrentSearchState>) {
  }

  ngOnInit() {
    this.store.select('currentSearch')
      .subscribe((data: CurrentSearchState) => this.searchPending = data.pending);
  }

}
