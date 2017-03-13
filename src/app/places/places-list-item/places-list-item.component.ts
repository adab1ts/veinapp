import {
  Component, Input, ChangeDetectionStrategy,
  trigger, state, animate, transition, style
} from '@angular/core';
import { Router } from '@angular/router';

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
  state = 'visible';

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['detail', this.place.$key]);
  }
}
