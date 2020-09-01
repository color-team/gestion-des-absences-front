import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdministrateurComponent } from './menu-administrateur.component';

describe('MenuAdministrateurComponent', () => {
  let component: MenuAdministrateurComponent;
  let fixture: ComponentFixture<MenuAdministrateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAdministrateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
