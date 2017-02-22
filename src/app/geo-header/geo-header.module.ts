import { NgModule } from '@angular/core';
import { GeoHeaderComponent } from './geo-header.component';
import { GeoSearchModule } from '../geo-search/geo-search.module';

@NgModule({
  imports: [
    GeoSearchModule
  ],
  exports: [
    GeoHeaderComponent
  ],
  declarations: [
    GeoHeaderComponent
  ]
})
export class GeoHeaderModule { }
