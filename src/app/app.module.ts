import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { CovalentCoreModule } from '@covalent/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import './rxjs-extensions';

import { AppComponent } from './app.component';
import { firebaseConfig } from '../config/firebase';
import { GeoModule } from './geo/geo.module';
import { CurrentSearchReducer } from './state-management/reducers/current-search-reducer';
import { CurrentSearchEffectService } from './state-management/effects/current-search-effect.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CovalentCoreModule.forRoot(),
    GeoModule,
    StoreModule.provideStore({CurrentSearchReducer}),
    EffectsModule.run(CurrentSearchEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
