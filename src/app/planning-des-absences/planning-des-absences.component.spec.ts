import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDesAbsencesComponent } from './planning-des-absences.component';

describe('PlanningDesAbsencesComponent', () => {
  let component: PlanningDesAbsencesComponent;
  let fixture: ComponentFixture<PlanningDesAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningDesAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningDesAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
