import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelAdminRoutingModule } from './hotel-admin-routing.module';
import { HotelAdminComponent } from './hotel-admin/hotel-admin.component';
import { HotelAdminFormComponent } from './hotel-admin-form/hotel-admin-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HotelAdminComponent,
    HotelAdminFormComponent
  ],
  imports: [
    CommonModule,
    HotelAdminRoutingModule,
    SharedModule
  ]
})
export class HotelAdminModule { }
