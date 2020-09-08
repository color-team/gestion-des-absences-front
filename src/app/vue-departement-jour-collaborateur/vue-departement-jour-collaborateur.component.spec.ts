import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueDepartementJourCollaborateurComponent } from './vue-departement-jour-collaborateur.component';

describe('VueDepartementJourCollaborateurComponent', () => {
  let component: VueDepartementJourCollaborateurComponent;
  let fixture: ComponentFixture<VueDepartementJourCollaborateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueDepartementJourCollaborateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueDepartementJourCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
