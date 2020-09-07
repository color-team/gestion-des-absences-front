import { TestBed } from '@angular/core/testing';

import { VisualisationJferieService } from './visualisation-jferie.service';

describe('VisualisationJferieService', () => {
  let service: VisualisationJferieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualisationJferieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
