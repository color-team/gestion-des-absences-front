import { TestBed } from '@angular/core/testing';

import { AjoutJourFerieRttService } from './ajout-jour-ferie-rtt.service';

describe('AjoutJourFerieRttService', () => {
  let service: AjoutJourFerieRttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutJourFerieRttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
