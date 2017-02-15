import { NgModule } from '@angular/core';

import { GeocodeService } from './geocode/geocode.service';
import { MapzenGeocodeService } from './geocode/mapzen-geocode.service';

@NgModule({
  providers: [
    GeocodeService,
    MapzenGeocodeService
  ],
  declarations: []
})
export class GeoModule {
}

export {
  GeocodeService
}
