/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceItemComponent } from './place-item.component';
import { CovalentCoreModule } from '@covalent/core';

describe('PlaceItemComponent', () => {
  let component: PlaceItemComponent;
  let fixture: ComponentFixture<PlaceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CovalentCoreModule.forRoot() ],
      declarations: [ PlaceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
