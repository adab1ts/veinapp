import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from './state-management/reducers';
import { DoGeosearch } from './state-management/actions/current-search-action';
import { CloseSidenavAction, OpenSidenavAction } from './state-management/actions/layout-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  searchPending$;
  layoutOpen$;
  geolocationPending = false;
  subscription: Subscription = new Subscription;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.subscription = this.store.select(fromRoot.radius)
      .withLatestFrom(this.store.select(fromRoot.center))
      .take(1)
      .subscribe(data => {
        this.store.dispatch(new DoGeosearch({
            radius: data[ 0 ],
            center: data[ 1 ]
          }));
        this.subscription.unsubscribe();
      });

    this.searchPending$ = this.store.select(fromRoot.pending);
    this.layoutOpen$ = this.store.select(fromRoot.getShowSidenav);

  }

  onOpenSideNav(view) {
    this.store
      .dispatch(view ? new OpenSidenavAction() : new CloseSidenavAction());
  }

}
