import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutJourFerieRttComponent } from './ajout-jour-ferie-rtt.component';

describe('AjoutJourFerieRttComponent', () => {
  let component: AjoutJourFerieRttComponent;
  let fixture: ComponentFixture<AjoutJourFerieRttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutJourFerieRttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutJourFerieRttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
