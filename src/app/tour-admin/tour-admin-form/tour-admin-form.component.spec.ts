import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourAdminFormComponent } from './tour-admin-form.component';

describe('TourAdminFormComponent', () => {
  let component: TourAdminFormComponent;
  let fixture: ComponentFixture<TourAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
