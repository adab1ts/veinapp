import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: [ './input-search.component.scss' ]
})
export class InputSearchComponent {
  @Output() onSearch = new EventEmitter();
  @Input() state;
  @ViewChild('searchInput') input;

  search() {
    const val = this.input.value;
    if (!val) { return; }
    this.onSearch.emit(val);
  }

}
