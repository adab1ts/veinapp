import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-indicator',
  template: `
    <md-progress-bar
      *ngIf="pending"
      color="accent"
      mode="indeterminate">
    </md-progress-bar>
  `,
  styles: [`
    md-progress-bar {
      z-index: 100;
    }
  `]
})
export class ActivityIndicatorComponent {
  @Input() pending = false;
}
