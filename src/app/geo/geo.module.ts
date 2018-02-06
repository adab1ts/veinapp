import { NgModule } from '@angular/core';

import { GeocodeService } from './geocode/geocode.service';
import { MapboxGeocodingService } from './geocode/mapbox-geocoding.service';
import { WindowRefService } from './windowRef/window-ref.service';
import { GeolocationService } from './geolocation/geolocation.service';
import { GeosearchingService } from './geosearching/geosearching.service';
import { LeafletMapComponent } from './map/leaflet-map/leaflet-map.component';
import { FirebaseQueryingService } from './firebase-querying/firebase-querying.service';

@NgModule({
  providers: [
    GeocodeService,
    MapboxGeocodingService,
    WindowRefService,
    GeolocationService,
    GeosearchingService,
    FirebaseQueryingService
  ],
  declarations: [
    LeafletMapComponent
  ],
  exports: [
    LeafletMapComponent
  ]
})
export class GeoModule {
}

export {
  GeocodeService,
  GeolocationService,
  GeosearchingService,
  FirebaseQueryingService
}
