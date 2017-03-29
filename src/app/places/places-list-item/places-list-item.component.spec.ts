/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesListItemComponent } from './places-list-item.component';
import { CovalentCoreModule } from '@covalent/core';

describe('PlacesListItemComponent', () => {
  let component: PlacesListItemComponent;
  let fixture: ComponentFixture<PlacesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CovalentCoreModule.forRoot()],
      declarations: [ PlacesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
