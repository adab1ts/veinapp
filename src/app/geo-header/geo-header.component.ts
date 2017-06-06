import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../state-management/reducers';
import * as search from '../state-management/actions/current-search-action';

@Component({
  selector: 'app-geo-header',
  templateUrl: './geo-header.component.html',
  styles: [`
    :host {
      font-size: 1rem;
    }

    @media (min-width: 960px) {
      :host {
        font-size: 1em;
      }
    }
  `]
})
export class GeoHeaderComponent implements OnInit {
  currentRadius$ = undefined;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.currentRadius$ = this.store.select(fromRoot.radius);
  }

  // TODO prevent from doing the search if text has not changed
  search(address: string) {
    this.store.dispatch(new search.ChangeSearchFromAddress({ address }));
  }

  changeRadius(radius) {
    this.store.dispatch(new search.ChangeSearchByRadius({ radius }));
  }

  geolocateAndSearch() {
    this.store.dispatch(new search.GeosearchFromLocation());
  }

}
