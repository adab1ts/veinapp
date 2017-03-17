import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TdMediaService } from '@covalent/core';
import { go } from '@ngrx/router-store';

import * as fromRoot from '../state-management/reducers';
import { OpenSidenavAction } from '../state-management/actions/layout-action';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html'
})
export class PlacesComponent implements OnInit, AfterViewInit {
  center$;
  places$;
  pending$;
  address$;
  selectedPlace$;
  layoutOpen$;

  constructor(public media: TdMediaService,
              private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.pending$ = this.store.select(fromRoot.pending);
    this.address$ = this.store.select(fromRoot.address);
    this.selectedPlace$ = this.store.select(fromRoot.selected);
    this.center$ = this.store.select(fromRoot.center);
    this.places$ = this.store.select(fromRoot.places);
    this.layoutOpen$ = this.store.select(fromRoot.getShowSidenav);
  }

  ngAfterViewInit() {
    this.media.broadcast();
  }

  onChangeSelectedPlace(placeKey) {
    this.store.dispatch(new OpenSidenavAction());
    this.store.dispatch(go(`/detail/${placeKey}`));
  }

}
