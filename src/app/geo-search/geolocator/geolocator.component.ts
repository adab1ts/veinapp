import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geolocator',
  template: `
    <button md-icon-button (click)="geolocate()">
      <md-icon>location_searching</md-icon>
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

  geolocate() {
    this.onGeolocate.emit(null);
  }
}
