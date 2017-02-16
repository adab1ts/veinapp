import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { CovalentCoreModule } from '@covalent/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import './rxjs-extensions';

import { AppComponent } from './app.component';
import { GeoModule } from './geo/geo.module';
import { CurrentSearchEffectService } from './state-management/effects/current-search-effect.service';
import { GeoHeaderModule } from './geo-header/geo-header.module';
import { FooterModule } from './footer/footer.module';
import { PlacesModule } from './places/places.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { reducer } from './state-management/reducers/index';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CovalentCoreModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(CurrentSearchEffectService),
    // TODO remove on prod
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    SharedModule,
    GeoModule,
    GeoHeaderModule,
    FooterModule,
    PlacesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
