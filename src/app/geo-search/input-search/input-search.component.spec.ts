/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovalentCoreModule } from '@covalent/core';

import { InputSearchComponent } from './input-search.component';

describe('InputSearchComponent', () => {
  let component: InputSearchComponent;
  let fixture: ComponentFixture<InputSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CovalentCoreModule.forRoot() ],
      declarations: [ InputSearchComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create input search component', () => {
    expect(component).toBeTruthy();
  });
});
