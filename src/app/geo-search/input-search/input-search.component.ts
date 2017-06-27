import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy } from '@angular/core';
import { TdSearchInputComponent } from '@covalent/core';

@Component({
  selector: 'app-input-search',
  template: `
    <td-search-input flex
      #searchInput
      placeholder="ex: Carrer Doctor Aiguader, 18, Barcelona"
      [showUnderline]="true"
      (search)="handleSearch()">
    </td-search-input>

    <button flex="none" md-icon-button (click)="handleSearch()">
      <md-icon>search</md-icon>
    </button>
  `,
  styles: [`
    td-search-input {
      padding: 0 .5em;
    }

    button[md-icon-button] {
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSearchComponent {
  @ViewChild('searchInput') searchInput: TdSearchInputComponent;
  @Output() onSearch = new EventEmitter();

  // TODO: reset when geosearch completes
  // @Input() set reset(action) {
  //   if (action) {
  //     this.searchInput.clearSearch();
  //   }
  // }

  handleSearch() {
    const searchTerm: string = this.searchInput.value;

    if (searchTerm) {
      this.onSearch.emit(searchTerm);
      this.searchInput.value = '';
    }
  }
}
