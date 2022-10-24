import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { RecievableComponent } from './recievable/recievable.component';
import { TourBookingDashboardComponent } from './tour-booking-dashboard/tour-booking-dashboard.component';
import { TourBookingComponent } from './tour-booking/tour-booking.component';

const routes: Routes = [
  {
    path: 'receivalbe',
    component: RecievableComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      permissions:{
        only:[
          'accessMenuTourAdmin'
        ]
      }
    }
  },
  {
    path: 'dashboard',
    component: TourBookingDashboardComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      permissions:{
        only:[
          'accessMenuTourAdmin'
        ]
      }
    }
  },
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
