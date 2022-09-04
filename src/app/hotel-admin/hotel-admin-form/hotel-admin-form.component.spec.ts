import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAdminFormComponent } from './hotel-admin-form.component';

describe('HotelAdminFormComponent', () => {
  let component: HotelAdminFormComponent;
  let fixture: ComponentFixture<HotelAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
