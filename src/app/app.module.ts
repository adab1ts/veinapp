import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { CovalentCoreModule } from '@covalent/core';

import './rxjs-extensions';

import { AppComponent } from './app.component';
import { firebaseConfig } from '../config/firebase';
import { GeoModule } from './geo/geo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CovalentCoreModule.forRoot(),
    GeoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
