import { NgModule } from '@angular/core';
import { PlacesComponent } from './places.component';
import { CovalentCoreModule } from '@covalent/core';
import { PlacesListItemComponent } from './places-list-item/places-list-item.component';
import { GeoModule } from '../geo/geo.module';

@NgModule({
  imports: [
    CovalentCoreModule.forRoot(),
    GeoModule
  ],
  declarations: [
    PlacesComponent,
    PlacesListItemComponent
  ],
  exports: [
    PlacesComponent
  ]
})
export class PlacesModule { }
