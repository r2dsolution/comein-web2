import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourBookingRoutingModule } from './tour-booking-routing.module';
import { TourBookingComponent } from './tour-booking/tour-booking.component';
import { SharedModule } from '../shared/shared.module';
import { TourBookingDashboardComponent } from './tour-booking-dashboard/tour-booking-dashboard.component';


@NgModule({
  declarations: [
    TourBookingComponent,
    TourBookingDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TourBookingRoutingModule
  ]
})
export class TourBookingModule { }
