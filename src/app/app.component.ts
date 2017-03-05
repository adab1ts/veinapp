import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { CurrentSearchState } from './state-management/states/current-search-state';
import { doGeoSearch } from './state-management/actions/current-search-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  subscription = new Subscription();

  constructor(private store: Store<CurrentSearchState>) {
    // Initial search with default center
    this.subscription = this.store.select('currentSearch')
      .take(1)
      .subscribe((data: any) => {
        this.store
          .dispatch(doGeoSearch({
            radius: data.radius,
            center: data.center
          }));
        this.subscription.unsubscribe();
      });
  }

}
