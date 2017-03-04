import { NgModule } from '@angular/core';
import { GeoHeaderComponent } from './geo-header.component';
import { GeoSearchModule } from '../geo-search/geo-search.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    GeoSearchModule,
    SharedModule
  ],
  exports: [
    GeoHeaderComponent
  ],
  declarations: [
    GeoHeaderComponent
  ]
})
export class GeoHeaderModule { }
