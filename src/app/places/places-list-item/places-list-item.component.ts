import {
  Component, Input, ChangeDetectionStrategy,
  trigger, state, animate, transition, style, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-places-list-item',
  templateUrl: './places-list-item.component.html',
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
export class PlacesListItemComponent {
  @Input() place;
  @Output() showDetail = new EventEmitter();
  state = 'visible';

  goToDetail() {
    this.showDetail.emit(this.place.$key);
  }
}
