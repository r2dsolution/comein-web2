import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { TourBookingComponent } from './tour-booking/tour-booking.component';

const routes: Routes = [
  {
    path: '',
    component: TourBookingComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      permissions:{
        only:[
          'accessMenuTourBooking'
        ]
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourBookingRoutingModule { }
