import { TestBed } from '@angular/core/testing';

import { PlanningDesAbsencesService } from './planning-des-absences.service';

describe('PlanningDesAbsencesService', () => {
  let service: PlanningDesAbsencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningDesAbsencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
