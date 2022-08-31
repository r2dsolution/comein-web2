import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: '', component: BookingComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['accessMenuBooking']
      }
    }
  },
  {
    path: ':id/edit', component: BookingFormComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['accessMenuBooking']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
