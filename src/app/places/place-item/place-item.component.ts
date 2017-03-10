import {
  Component,
  OnInit,
  OnDestroy,
  trigger,
  state,
  style,
  transition,
  animate,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CurrentSearchState } from '../../state-management/states/current-search-state';
import { Store } from '@ngrx/store';
import { selectedPlace } from '../../state-management/actions/current-search-action';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  animations: [
    trigger('item', [
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('* => visible', animate('200ms ease-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceItemComponent implements OnInit, OnDestroy {
  state = 'visible';
  place;
  private routeParamSubscription: Subscription;

  constructor(private store: Store<CurrentSearchState>,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamSubscription = this.activatedRoute.params
      .take(1)
      .map(param => param[ '$key' ])
      .switchMap((key: string) => {
        this.store.dispatch(selectedPlace({ selectedPlace: key }));
        return this.store.select('currentSearch')
          .map(data => data[ 'placesList' ]
            .filter((place) => place[ '$key' ] === key)[ 0 ]
          );
      }).subscribe((place) => this.place = place);
  }

  ngOnDestroy() {
    this.store.dispatch(selectedPlace({ selectedPlace: null }));
    this.routeParamSubscription.unsubscribe();
  }

  goBack() {
    this.router.navigate([ '/' ]);
  }
}
