import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { PlaceItemComponent } from './places/place-item/place-item.component';

const appRoutes: Routes = [
  {
    path: '', component: PlacesComponent, children: [
    { path: 'detail/:$key', component: PlaceItemComponent }
  ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
