import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationAbsenceComponent } from './visualisation-absence.component';

describe('VisualisationAbsenceComponent', () => {
  let component: VisualisationAbsenceComponent;
  let fixture: ComponentFixture<VisualisationAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualisationAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
