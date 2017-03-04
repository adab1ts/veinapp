import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-radius-filter',
  templateUrl: './radius-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadiusFilterComponent {
  @Input() distances = [];
  @Input() currentRadius;
  @Output() onChangeRadius = new EventEmitter<number>();

  changeRadius(radius) {
    this.onChangeRadius.emit(radius);
  }

}
