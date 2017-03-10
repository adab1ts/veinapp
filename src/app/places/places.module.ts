import { NgModule } from '@angular/core';
import { PlacesComponent } from './places.component';
import { CovalentCoreModule } from '@covalent/core';
import { PlacesListItemComponent } from './places-list-item/places-list-item.component';
import { GeoModule } from '../geo/geo.module';
import { PlaceItemComponent } from './place-item/place-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CovalentCoreModule.forRoot(),
    GeoModule
  ],
  declarations: [
    PlacesComponent,
    PlacesListItemComponent,
    PlaceItemComponent
  ],
  exports: [
    PlacesComponent,
    PlaceItemComponent
  ]
})
export class PlacesModule { }
