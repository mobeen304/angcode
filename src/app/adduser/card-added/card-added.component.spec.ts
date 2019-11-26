import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAddedComponent } from './card-added.component';

describe('CardAddedComponent', () => {
  let component: CardAddedComponent;
  let fixture: ComponentFixture<CardAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
