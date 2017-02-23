import { NgModule } from '@angular/core';
import { InputSearchComponent } from './input-search/input-search.component';
import { CovalentSearchModule, CovalentCoreModule } from '@covalent/core';
import { CommonModule } from '@angular/common';
import { GeolocatorComponent } from './geolocator/geolocator.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentCoreModule.forRoot(),
    CovalentSearchModule.forRoot()
  ],
  declarations: [
    InputSearchComponent,
    GeolocatorComponent
  ],
  exports: [
    InputSearchComponent,
    GeolocatorComponent
  ]
})
export class GeoSearchModule {
}
