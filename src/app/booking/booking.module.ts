import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking/booking.component';
import { SharedModule } from '../shared/shared.module';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingVerifyDialogComponent } from './booking-verify-dialog/booking-verify-dialog.component';


@NgModule({
  declarations: [
    BookingComponent,
    BookingFormComponent,
    BookingVerifyDialogComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule
  ]
})
export class BookingModule { }
