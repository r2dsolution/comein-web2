import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelStaffFormComponent } from './hotel-staff-form.component';

describe('HotelStaffFormComponent', () => {
  let component: HotelStaffFormComponent;
  let fixture: ComponentFixture<HotelStaffFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelStaffFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
