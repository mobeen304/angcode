import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingresultComponent } from './trainingresult.component';

describe('TrainingresultComponent', () => {
  let component: TrainingresultComponent;
  let fixture: ComponentFixture<TrainingresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
