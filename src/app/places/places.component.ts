import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { TdMediaService } from '@covalent/core';
import { GeosearchResult } from '../geo/geosearching/geosearch';
import { CurrentSearchState } from '../state-management/states/current-search-state';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html'
})
export class PlacesComponent implements OnInit, OnDestroy, AfterViewInit {

  currentCenter: string;
  places: GeosearchResult[] = [];
  pending = false;
  center;
  subscription = new Subscription();

  constructor(public media: TdMediaService,
              private store: Store<CurrentSearchState>) {}

  ngOnInit() {
    this.subscription = this.store.select('currentSearch')
      .subscribe((data: any) => {
        this.pending = data.pending;
        this.currentCenter = data.address;
        this.places = data.placesList;
        this.center = data.center;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.media.broadcast();
  }
}
