import { Component } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import { GeocodeService } from './geo/geo.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  coords: number[] = [];

  constructor(private geocodeService: GeocodeService) {
  }

  ngOnInit() {
    this.geocodeService.getCoords('Carrer de la Jota 55, Barcelona')
      .subscribe(
        data => this.coords = data,
        error => console.error(error)
      );
  }

}
