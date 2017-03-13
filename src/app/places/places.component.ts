import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { TdMediaService } from '@covalent/core';

import * as fromRoot from '../state-management/reducers';

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
  subscription = new Subscription();

  constructor(public media: TdMediaService,
              private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.pending$ = this.store.select(fromRoot.pending);
    this.address$ = this.store.select(fromRoot.address);
    this.selectedPlace$ = this.store.select(fromRoot.selected);
    this.center$ = this.store.select(fromRoot.center);
    this.places$ = this.store.select(fromRoot.places);
  }

  ngAfterViewInit() {
    this.media.broadcast();
  }

}
