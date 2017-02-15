import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { CovalentCoreModule } from '@covalent/core';

import './rxjs-extensions';

import {ServicesModule} from './services/services.module';

import { AppComponent } from './app.component';

import { firebaseConfig } from '../config/firebase';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ServicesModule.forRoot(),
    CovalentCoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
