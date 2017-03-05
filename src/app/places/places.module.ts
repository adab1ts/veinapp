import { NgModule } from '@angular/core';
import { PlacesListComponent } from './places-list/places-list.component';
import { CovalentCoreModule } from '@covalent/core';
import { PlacesListItemComponent } from './places-list/places-list-item/places-list-item.component';

@NgModule({
  imports: [
    CovalentCoreModule.forRoot(),
  ],
  declarations: [
    PlacesListComponent,
    PlacesListItemComponent
  ],
  exports: [
    PlacesListComponent
  ]
})
export class PlacesModule { }
