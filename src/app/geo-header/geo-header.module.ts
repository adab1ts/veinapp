import { NgModule } from '@angular/core';
import { GeoHeaderComponent } from './geo-header.component';
import { GeoSearchModule } from '../geo-search/geo-search.module';
import { SharedModule } from '../shared/shared.module';
import { CovalentCoreModule } from '@covalent/core';

@NgModule({
  imports: [
    GeoSearchModule,
    SharedModule,
    CovalentCoreModule.forRoot()
  ],
  exports: [
    GeoHeaderComponent
  ],
  declarations: [
    GeoHeaderComponent
  ]
})
export class GeoHeaderModule { }
