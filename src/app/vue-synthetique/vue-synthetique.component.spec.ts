import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueSynthetiqueComponent } from './vue-synthetique.component';

describe('VueSynthetiqueComponent', () => {
  let component: VueSynthetiqueComponent;
  let fixture: ComponentFixture<VueSynthetiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueSynthetiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueSynthetiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
