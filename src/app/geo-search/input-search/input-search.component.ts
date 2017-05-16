import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input-search',
  template: `
    <td-search-input flex
      #searchInput
      placeholder="Introdueix la teva adreça"
      [showUnderline]="true"
      (search)="search()">
    </td-search-input>

    <button flex="none" md-icon-button (click)="search()">
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
  @ViewChild('searchInput') input;
  @Input() set address(address: string) {
    this.input.value = address;
  };
  @Input() set focus(focus: boolean) {
    const inputDirective = this.input._input;
    if (focus) { inputDirective.focus(); }
  };
  @Output() onSearch = new EventEmitter();

  search() {
    const val = this.input.value;
    if (!val) { return; }
    this.onSearch.emit(val);
  }

}
