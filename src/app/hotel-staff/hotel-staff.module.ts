import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelStaffRoutingModule } from './hotel-staff-routing.module';
import { HotelStaffComponent } from './hotel-staff/hotel-staff.component';
import { HotelStaffFormComponent } from './hotel-staff-form/hotel-staff-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HotelStaffComponent,
    HotelStaffFormComponent
  ],
  imports: [
    CommonModule,
    HotelStaffRoutingModule,
    SharedModule
  ]
})
export class HotelStaffModule { }
