import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnameComponent } from './addname.component';

describe('AddnameComponent', () => {
  let component: AddnameComponent;
  let fixture: ComponentFixture<AddnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
