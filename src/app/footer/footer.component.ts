import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div layout="row">
      <button flex md-button [disabled]="layoutOpen" (click)="this.openSideNav.emit(true)">
        <md-icon>list</md-icon>
      </button>

      <button flex md-button [disabled]="!layoutOpen" (click)="this.openSideNav.emit(false)">
        <md-icon>place</md-icon>
      </button>
    </div>
  `,
  styles: [`
    /deep/ td-layout-footer[hide-gt-md] > .td-layout-footer {
      padding: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input() layoutOpen;
  @Output() openSideNav = new EventEmitter();
}
