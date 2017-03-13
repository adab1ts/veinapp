import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from './state-management/reducers';
import { DoGeoSearch } from './state-management/actions/current-search-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  searchPending = false;
  geolocationPending = false;
  subscription: Subscription = new Subscription;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.subscription = this.store.select(fromRoot.radius)
      .withLatestFrom(this.store.select(fromRoot.center))
      .take(1)
      .subscribe(data => {
        this.store
          .dispatch(new DoGeoSearch({
            radius: data[ 0 ],
            center: data[ 1 ]
          }));
        this.subscription.unsubscribe();
      });

    this.store.select(fromRoot.pending)
      .subscribe((data: boolean) => this.searchPending = data);
  }

}
