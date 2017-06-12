import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-radius-filter-btn',
  template: `
    <button md-mini-fab
      [color]="this.currentRadius ? 'primary' : 'accent'"
      [ngClass]="{ 'va-radius-selected': this.currentRadius }"
      [disabled]="this.currentRadius"
      (click)="change(distance)"
    >
      {{ distance }}
    </button>
  `,
  styles: [`
    button[md-mini-fab] {
      margin-right: .2em;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadiusFilterBtnComponent {
  @Input() distance;
  @Input() currentRadius = false;
  @Output() onChange = new EventEmitter<number>();

  change(radius) {
    this.onChange.emit(radius);
  }
}
