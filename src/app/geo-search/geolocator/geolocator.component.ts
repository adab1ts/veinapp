import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-geolocator',
  templateUrl: './geolocator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeolocatorComponent {
  @Output() onGeolocate = new EventEmitter();

  geolocate() {
    this.onGeolocate.emit(null);
  }
}
