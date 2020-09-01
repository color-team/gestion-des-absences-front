import { TestBed } from '@angular/core/testing';

import { DemandeAbsenceService } from './demande-absence.service';

describe('DemandeAbsenceService', () => {
  let service: DemandeAbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeAbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
