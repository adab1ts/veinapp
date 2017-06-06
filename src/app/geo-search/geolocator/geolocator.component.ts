import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geolocator',
  template: `
    <button md-icon-button (click)="this.onGeolocate.emit(true)">
      <md-icon>gps_fixed</md-icon>
    </button>
  `,
  styles: [`
    button[md-icon-button] {
      margin: 0;
    }
  `]
})
export class GeolocatorComponent {
  @Output() onGeolocate = new EventEmitter();
}
