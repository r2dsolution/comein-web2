import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { PaymentDashboardComponent } from './payment-dashboard/payment-dashboard.component';
import { SetupPaymentConditionComponent } from './setup-payment-condition/setup-payment-condition.component';
import { TourDashboardComponent } from './tour-dashboard/tour-dashboard.component';
// import { TourBookingComponent } from './tour-booking/tour-booking.component';
import { TourFormComponent } from './tour-form/tour-form.component';
// import { TourInventoryComponent } from './tour-inventory/tour-inventory.component';
// import { TourPaymentComponent } from './tour-payment/tour-payment.component';
import { TourComponent } from './tour/tour.component';

const routes: Routes = [
  {
    path: 'dashboard', component: TourDashboardComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuTour']
      }
    }
  },
  {
    path: 'payment-dashboard', component: PaymentDashboardComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuTour']
      }
    }
  },
  {
    path: 'payment-condition', component: SetupPaymentConditionComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuTourAdmin']
      }
    }
  },
  {
    path: '', component: TourComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuTour']
      }
    }
  },
  {
    path: ':id/edit', component: TourFormComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuTour']
      }
    }
  },
  // {
  //   path: ':id/payment', component: TourPaymentComponent,
  // },
  // {
  //   path: ':id/inventory', component: TourInventoryComponent,
  // },
  // {
  //   path: ':id/booking', component: TourBookingComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule { }
