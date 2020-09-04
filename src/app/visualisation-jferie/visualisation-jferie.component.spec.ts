import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationJferieComponent } from './visualisation-jferie.component';

describe('VisualisationJferieComponent', () => {
  let component: VisualisationJferieComponent;
  let fixture: ComponentFixture<VisualisationJferieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualisationJferieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationJferieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
