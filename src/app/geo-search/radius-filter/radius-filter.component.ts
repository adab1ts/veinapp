import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-radius-filter',
  template: `
    <div class="va-radius-filter">
      <app-radius-filter-btn
        *ngFor="let distance of distances"
        [currentRadius]="isCurrentRadius(distance)"
        [distance]="distance"
        (onChange)="changeRadius($event)">
      </app-radius-filter-btn>
      <small>kms</small>
    </div>
  `,
  styles: [`
    .va-radius-filter {
      width: 12em;
      text-align: center;
      margin: 0 auto 1em;
    }

    @media (min-width: 600px) {
      .va-radius-filter {
        margin: 0 auto;
      }
    }

    @media (min-width: 768px) {
      .va-radius-filter {
        margin: 0 2em;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadiusFilterComponent {
  @Input() distances = [];
  @Input() currentRadius;
  @Output() onChangeRadius = new EventEmitter<number>();

  changeRadius(radius) {
    this.onChangeRadius.emit(radius);
  }

  isCurrentRadius(distance) {
    return this.currentRadius === distance;
  }

}
