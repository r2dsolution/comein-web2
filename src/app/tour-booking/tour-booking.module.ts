import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourBookingRoutingModule } from './tour-booking-routing.module';
import { TourBookingComponent } from './tour-booking/tour-booking.component';
import { SharedModule } from '../shared/shared.module';
import { TourBookingDashboardComponent } from './tour-booking-dashboard/tour-booking-dashboard.component';
import { RecievableComponent } from './recievable/recievable.component';
import { ReceivableNoteDialogComponent } from './receivable-note-dialog/receivable-note-dialog.component';
import { TourNoteDialogComponent } from './tour-note-dialog/tour-note-dialog.component';
import { HotelNoteDialogComponent } from './hotel-note-dialog/hotel-note-dialog.component';
import { AddPeriodDialogComponent } from './add-period-dialog/add-period-dialog.component';
import { BookingNoteDialogComponent } from './booking-note-dialog/booking-note-dialog.component';


@NgModule({
  declarations: [
    TourBookingComponent,
    TourBookingDashboardComponent,
    RecievableComponent,
    ReceivableNoteDialogComponent,
    TourNoteDialogComponent,
    HotelNoteDialogComponent,
    AddPeriodDialogComponent,
    BookingNoteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TourBookingRoutingModule
  ]
})
export class TourBookingModule { }
