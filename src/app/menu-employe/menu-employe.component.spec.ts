import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEmployeComponent } from './menu-employe.component';

describe('MenuEmployeComponent', () => {
  let component: MenuEmployeComponent;
  let fixture: ComponentFixture<MenuEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
