import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchingStates } from './state-management/states/search-result-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'app works!';
  currentSearchData$;
  resultData;

  constructor(private store: Store<any>) {
    this.currentSearchData$ = this.store.select('CurrentSearchReducer');
    this.store.select('SearchResultReducer')
      .subscribe((status) =>
        this.resultData = SearchingStates[ status[ 'result' ] ]
      );
  }

}
