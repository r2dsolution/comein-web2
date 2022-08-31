import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { HotelStaffFormComponent } from './hotel-staff-form/hotel-staff-form.component';
import { HotelStaffComponent } from './hotel-staff/hotel-staff.component';

const routes: Routes = [
  {
    path: '', component: HotelStaffComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuHotelStaff']
      }
    }
  },
  {
    path: ':id/edit', component: HotelStaffFormComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuHotelStaff']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelStaffRoutingModule { }
