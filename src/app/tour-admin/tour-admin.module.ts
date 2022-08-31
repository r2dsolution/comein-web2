import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { TourAdminRoutingModule } from './tour-admin-routing.module';
import { TourAdminComponent } from './tour-admin/tour-admin.component';
import { TourAdminFormComponent } from './tour-admin-form/tour-admin-form.component';


@NgModule({
  declarations: [
    TourAdminComponent,
    TourAdminFormComponent
  ],
  imports: [
    CommonModule,
    TourAdminRoutingModule,
    SharedModule
  ]
})
export class TourAdminModule { }
