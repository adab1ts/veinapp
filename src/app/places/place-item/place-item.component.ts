import {
  Component,
  OnInit,
  OnDestroy,
  trigger, state, style, transition, animate } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import * as fromRoot from '../../state-management/reducers';
import * as search from '../../state-management/actions/current-search-action';
import { GeosearchResult } from '../../geo/geodata';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styles: [`
    md-card md-card-header {
      height: 3em;
      margin: 0;
      padding: 0 1em;
    }

    @media (min-width: 600px) {
      md-card md-card-header {
        padding-bottom: 1em;
      }
    }

    md-card md-card-header button {
      margin-top: .25em;
    }
  
    md-card md-card-header md-card-title {
      margin: 0;
      padding: 0;
    }

    md-card md-card-content .va-card-content-group {
      padding: 1em;
    }

    md-card md-card-content .va-card-content-group h4 {
      font-weight: normal;
      font-size: 16px;
      margin: 0 0 .25em;
    }

    md-card md-card-content .va-card-content-group p {
      margin: 0;
    }

    md-card md-card-content .va-card-content-group span {
      display: block;
    }
  `],
  animations: [
    trigger('item', [
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('* => visible', animate('200ms ease-in'))
    ])
  ]
})
export class PlaceItemComponent implements OnInit, OnDestroy {
  state = 'visible';
  place: GeosearchResult;
  private routeParamSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamSubscription = this.activatedRoute.params
      .map(param => param[ '$key' ])
      .switchMap((key: string) => {
        return this.store.select(fromRoot.places)
          .withLatestFrom(Observable.of(key));
      })
      .map((data) => data[ 0 ]
        .filter((place) => place[ '$key' ] === data[ 1 ])[ 0 ]
      )
      .subscribe((place) => {
        if (!place) {
          this.goBack();
        }
        this.store
          .dispatch(new search.SelectedPlace(place));
        this.place = place;
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new search.SelectedPlace(null));
    this.routeParamSubscription.unsubscribe();
  }

  goBack() {
    this.store.dispatch(go('/'));
  }
}
