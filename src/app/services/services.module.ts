import {NgModule} from '@angular/core';

import {GeocodeService} from './geocode.services/geocode.service';
import {MapzenGeocodeService} from './geocode.services/mapzen-geocode.service';

@NgModule()
export class ServicesModule {

  // TODO - provide in the corresponding module when created,
  // not the root module
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        GeocodeService,
        MapzenGeocodeService
      ]
    };
  };
}
