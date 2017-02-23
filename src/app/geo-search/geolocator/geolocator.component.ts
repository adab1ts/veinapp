import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geolocator',
  templateUrl: './geolocator.component.html',
  styleUrls: [ './geolocator.component.scss' ]
})
export class GeolocatorComponent {
  @Output() onGeolocate = new EventEmitter();

  geolocate() {
    this.onGeolocate.emit(null);
  }
}
