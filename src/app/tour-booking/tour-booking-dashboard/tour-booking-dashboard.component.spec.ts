import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBookingDashboardComponent } from './tour-booking-dashboard.component';

describe('TourBookingDashboardComponent', () => {
  let component: TourBookingDashboardComponent;
  let fixture: ComponentFixture<TourBookingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourBookingDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourBookingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
